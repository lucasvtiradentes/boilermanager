#! /usr/bin/env node

import chalk from 'chalk';
import { program } from 'commander';
import figlet from 'figlet';
import fuse from 'fuse.js';
import inquirer, { Question } from 'inquirer';
import inquirerPrompt from 'inquirer-autocomplete-prompt';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import updateNotifier, { Settings } from 'update-notifier';
import { APP_DESCRIPTION, APP_NAME, APP_VERSION, GITHUB_BOILERPLATES_REPOSITORY, NODE_ENV, PACKAGE_JSON } from './configs/configs';
import { BoilerplateHandlerContext } from './entities/BoilerplateHandler';
import { githubStrategy } from './entities/GithubStrategy';
import { pathStrategy } from './entities/PathStrategy';
import { RuntimeSettings } from './types/RuntimeSettings';
import { logger } from './utils/logger';

(async () => {
  console.log(chalk.red(figlet.textSync(APP_NAME, { horizontalLayout: 'default' })));

  if (NODE_ENV !== 'production') {
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
    updateCheckInterval: 1000 * 60 * 1 // 1 minuto
  });

  return notifier.update;
}

async function initBoilerplateManager() {
  const bpmInstance: RuntimeSettings = {
    source: GITHUB_BOILERPLATES_REPOSITORY,
    sourceType: 'default',
    context: new BoilerplateHandlerContext(githubStrategy),
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
    bpmInstance.context = new BoilerplateHandlerContext(githubStrategy);

    logger.info(`using boilerplates from: ${chalk.magenta('custom repository')}`);
    bpmInstance.boilerplatesArr = await bpmInstance.context.list(bpmInstance.source);
  }

  if (options.folder) {
    bpmInstance.source = '';
    bpmInstance.sourceType = 'path';
    bpmInstance.context = new BoilerplateHandlerContext(pathStrategy);

    const folderPath = resolve(options.folder);
    if (!existsSync(folderPath)) {
      logger.error(`folder path [${options.folder}] does not exists`);
      process.exit(1);
    }

    logger.info(`using boilerplates from: ${chalk.magenta('local folder')}`);
    const localBoilerplatesArr = await bpmInstance.context.list(folderPath);
    bpmInstance.boilerplatesArr = localBoilerplatesArr;
  }

  if (bpmInstance.sourceType === 'default') {
    logger.info(`using boilerplates from: ${chalk.magenta('default repository')}`);
    bpmInstance.boilerplatesArr = await bpmInstance.context.list(bpmInstance.source);
  }

  if (bpmInstance.boilerplatesArr.length === 0) {
    logger.error('current boilerplate list has no items!');
    process.exit(1);
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
    console.table(bpmInstance.boilerplatesArr.map((item) => ({ category: item.category, name: item.name, lastUpdate: item.lastUpdate })));
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
    const createdBoilerplate = await bpmInstance.context.choose(bpmInstance, answers.boilerplate.name);
    if (createdBoilerplate) {
      logger.info(`boilerplate [${chalk.green(answers.boilerplate.name)}] was created ✅\n`);
    } else {
      logger.error(`boilerplate [${chalk.red(answers.boilerplate.name)}] was not created ❌\n`);
    }
  });
}
