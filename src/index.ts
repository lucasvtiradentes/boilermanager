#! /usr/bin/env node

import chalk from 'chalk';
import { program } from 'commander';
import figlet from 'figlet';
import { existsSync } from 'node:fs';
import fuse from 'fuse.js';
import inquirer, { Question } from 'inquirer';
import inquirerPrompt from 'inquirer-autocomplete-prompt';
import { resolve } from 'node:path';
import updateNotifier, { Settings } from 'update-notifier';
import { APP_DESCRIPTION, APP_NAME, APP_VERSION, GITHUB_BOILERPLATES_REPOSITORY, NODE_ENV, PACKAGE_JSON } from './configs/configs';
import { BoilerplateHandlerContext } from './entities/BoilerplateHandler';
import { githubStrategy } from './entities/GithubStrategy';
import { pathStrategy } from './entities/PathStrategy';
import { RuntimeSettings } from './types/RuntimeSettings';
import { logger } from './utils/logger';

console.log(chalk.red(figlet.textSync(APP_NAME, { horizontalLayout: 'default' })));

if (NODE_ENV === 'production' && hasNewerVersion()) {
  new Promise<void>((resolve) =>
    setTimeout(() => {
      resolve();
    }, 1500)
  ).then(() => initBoilerplateManager());
} else {
  initBoilerplateManager();
}

function hasNewerVersion() {
  logger.info(`checking if there is a newer ${APP_NAME} version`);
  const pkg = PACKAGE_JSON as Settings['pkg'];
  const notifier = updateNotifier({ pkg });
  if (notifier.update) {
    notifier.notify();
    return true;
  }
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
  .option('-p, --path <folder>', 'use only boilerplates from a specific local folder')
  .option('-l, --list', 'show the current boilerplate list');

  program.parse();
  const options = program.opts();
  bpmInstance.options = options;

  /* ------------------------------------------------------------------------ */

  if (options.repository) {
    bpmInstance.source = options.repository;
    bpmInstance.sourceType = 'repository';
    bpmInstance.context = new BoilerplateHandlerContext(githubStrategy);

    logger.info(`using boilerplates from [custom repository]`);
    bpmInstance.boilerplatesArr = await bpmInstance.context.list(bpmInstance.source);
  }

  if (options.path) {
    bpmInstance.source = '';
    bpmInstance.sourceType = 'path';
    bpmInstance.context = new BoilerplateHandlerContext(pathStrategy);

    const folderPath = resolve(options.path);
    if (!existsSync(folderPath)) {
      logger.error(`folder path [${options.path}] does not exists`);
      process.exit(1);
    }

    logger.info(`using boilerplates from [local folder]`);
    const localBoilerplatesArr = await bpmInstance.context.list(folderPath);
    bpmInstance.boilerplatesArr = localBoilerplatesArr;
  }

  /* ------------------------------------------------------------------------ */

  if (bpmInstance.sourceType === 'default') {
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

  /* ------------------------------------------------------------------------ */

  if (options.list) {
    console.table(bpmInstance.boilerplatesArr.map((item) => ({ category: item.category, name: item.name, lastUpdate: item.lastUpdate })));
    process.exit(0);
  }

  /* ------------------------------------------------------------------------ */

  inquirer.registerPrompt('autocomplete', inquirerPrompt);

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

  inquirer.prompt(promptQuestions).then(async (answers) => {
    const createdBoilerplate = await bpmInstance.context.choose(bpmInstance, answers.boilerplate.name);
    if (createdBoilerplate) {
      logger.info(`boilerplate [${answers.boilerplate.name}] was created!\n`);
    }
  });
}
