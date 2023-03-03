#! /usr/bin/env node

import chalk from 'chalk';
import { program } from 'commander';
import figlet from 'figlet';
import fuse from 'fuse.js';
import inquirer, { Question } from 'inquirer';
import inquirerPrompt from 'inquirer-autocomplete-prompt';
import { execSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { existsSync, mkdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { extname, join, resolve } from 'node:path';
import updateNotifier, { Settings } from 'update-notifier';
import { APP_DESCRIPTION, APP_NAME, APP_VERSION, GITHUB_BOILERPLATES_REPOSITORY, GITHUB_DOWNLOAD_FOLDER_STRATEGY, NODE_ENV, PACKAGE_JSON } from './configs/configs';
import { BoilerplateHandler } from './strategies/boilerplateHandler/BoilerplateHandler';
import { GithubStrategy } from './strategies/boilerplateHandler/GithubStrategy';
import { PathStrategy } from './strategies/boilerplateHandler/PathStrategy';
import { BoilerplateInfo } from './types/Boilerplate';
import { RuntimeSettings } from './types/RuntimeSettings';
import { deleteFolder } from './utils/fs-utils';
import { logger } from './utils/logger';
import { errorHandler } from './utils/error-handler';

(async () => {
  console.log(chalk.red(figlet.textSync(APP_NAME, { horizontalLayout: 'default' })));

  if (NODE_ENV === 'production') {
    const newVersion = getNewerVersion();
    if (newVersion) {
      logger.info(`new version [${chalk.green(newVersion.latest)}] available, update by running: ${chalk.green(`npm install -g ${APP_NAME}`)}`);
    } else {
      logger.info(`you are running the latest ${APP_NAME} version [${chalk.gray(APP_VERSION)}]`);
    }
  }

  await initBoilerplateManager();
})();

/* -------------------------------------------------------------------------- */

function getNewerVersion() {
  logger.info(`checking if there is a newer ${APP_NAME} version`);
  const pkg = PACKAGE_JSON as Settings['pkg'];
  const notifier = updateNotifier({
    pkg,
    updateCheckInterval: 1000 * 60 * 1 // 1 minute
  });

  return notifier.update;
}

async function initBoilerplateManager() {
  const bpmInstance: RuntimeSettings = {
    source: GITHUB_BOILERPLATES_REPOSITORY,
    sourceType: 'default',
    context: new BoilerplateHandler(new GithubStrategy(GITHUB_DOWNLOAD_FOLDER_STRATEGY)),
    boilerplatesArr: [],
    options: {}
  };

  program.name(APP_NAME).version(APP_VERSION).description(APP_DESCRIPTION);
  // prettier-ignore
  program
  .option('-r, --repository <repo>', 'use your github boilerplates')
  .option('-f, --folder <folder>', 'use only boilerplates from a specific local folder')
  .option('-l, --list', 'show the current boilerplate list');

  program.parse();
  const options = program.opts();
  bpmInstance.options = options;

  if (options.repository) {
    bpmInstance.source = options.repository;
    bpmInstance.sourceType = 'repository';
    bpmInstance.context = new BoilerplateHandler(new GithubStrategy(GITHUB_DOWNLOAD_FOLDER_STRATEGY));

    logger.info(`using boilerplates from: ${chalk.blue('custom repository')}`);
    bpmInstance.boilerplatesArr = await bpmInstance.context.list(bpmInstance.source);
  }

  if (options.folder) {
    bpmInstance.source = '';
    bpmInstance.sourceType = 'path';
    bpmInstance.context = new BoilerplateHandler(new PathStrategy());

    const folderPath = resolve(options.folder);
    if (!existsSync(folderPath)) {
      errorHandler(`folder path [${options.folder}] does not exists`);
    }

    logger.info(`using boilerplates from: ${chalk.blue('local folder')}`);
    const localBoilerplatesArr = await bpmInstance.context.list(folderPath);
    bpmInstance.boilerplatesArr = localBoilerplatesArr;
  }

  if (bpmInstance.sourceType === 'default') {
    logger.info(`using boilerplates from: ${chalk.blue('default repository')}`);
    bpmInstance.boilerplatesArr = await bpmInstance.context.list(bpmInstance.source);
  }

  if (bpmInstance.boilerplatesArr.length === 0) {
    errorHandler('current boilerplate list has no items!');
  }

  const maxBoilerplateLength = Math.max(...bpmInstance.boilerplatesArr.map((item) => item.name.length));

  const parsedBoilerplates = bpmInstance.boilerplatesArr.map((item) => ({
    name: `${item.name}${' '.repeat(maxBoilerplateLength - item.name.length)}   ${item.category}`,
    value: item
  }));

  const fuzzy = new fuse(parsedBoilerplates, {
    includeScore: true,
    keys: ['name']
  });

  if (options.list) {
    console.table(bpmInstance.boilerplatesArr.map((item) => ({ category: item.category, name: item.name })));
    process.exit(0);
  }

  const promptQuestions: Question[] = [
    {
      type: 'autocomplete',
      name: 'boilerplate',
      message: 'Choose the desired boilerplate to start with: ',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      source: (_, query) => Promise.resolve(query ? fuzzy.search(query).map((it) => it.item) : parsedBoilerplates)
    }
  ];

  inquirer.registerPrompt('autocomplete', inquirerPrompt);

  inquirer.prompt(promptQuestions).then(async (answers) => {
    const selectedBoilerplate: BoilerplateInfo = answers.boilerplate;
    const optionsArr = selectedBoilerplate.options;

    if (optionsArr.length > 0) {
      const parsedBoilerplateQuestions = optionsArr.map((item) => {
        return {
          type: 'list',
          name: item.name,
          message: item.message,
          choices: item.list.map((it) => ({ name: it.title, value: it }))
        };
      });

      inquirer.prompt(parsedBoilerplateQuestions).then(async (options) => {
        await createBoilerplate(`${selectedBoilerplate.category}/${selectedBoilerplate.name}`);
        const boilerplateFolder = resolve(`./${selectedBoilerplate.name}`);

        logger.info(`applying the specified customizations`);

        const getStringWithoutLastNewLine = (str: string) => str.substring(0, str.lastIndexOf('\n')) + str.substring(str.lastIndexOf('\n') + 1);

        Object.keys(options).forEach((key: string) => {
          const optionFile = options[key].file;
          const finalFilePath = resolve(join(boilerplateFolder, optionFile));

          if (!existsSync(finalFilePath)) {
            deleteFolder(boilerplateFolder);
            errorHandler(`boilerplate does not contain the selected option script file: [${chalk.red(optionFile)}]`);
          }

          if (extname(finalFilePath) !== '.js') {
            deleteFolder(boilerplateFolder);
            errorHandler(`option script [${chalk.red(optionFile)}] is not a javascript file.`);
          }

          const result = execSync(`node "${finalFilePath}"`).toString();
          console.log(getStringWithoutLastNewLine(result));
        });

        logger.info(`boilerplate was customized according to the selected options ✅`);
      });
    } else {
      await createBoilerplate(`${selectedBoilerplate.category}/${selectedBoilerplate.name}`);
      logger.info(`boilerplate [${chalk.green(selectedBoilerplate.name)}] was created ✅`);
    }
  });

  async function createBoilerplate(boilerplateName: string) {
    logger.info(`creating the selected boilerplate`);
    const tmpFolder = createTempFolder();
    const hasCreatedBoilerplate = await bpmInstance.context.choose(bpmInstance, boilerplateName, tmpFolder);

    if (!hasCreatedBoilerplate) {
      errorHandler(`boilerplate [${chalk.red(boilerplateName)}] was not created ❌`);
    }
  }

  function createTempFolder() {
    const tmpFolder = join(tmpdir(), `bpm-${randomUUID()}`);
    if (existsSync(tmpFolder)) {
      rmSync(tmpFolder, { recursive: true });
    }

    mkdirSync(tmpFolder);
    return resolve(tmpFolder);
  }
}
