#! /usr/bin/env node

import chalk from 'chalk';
import { program } from 'commander';
import figlet from 'figlet';
import fuse from 'fuse.js';
import inquirer, { Question } from 'inquirer';
import inquirerPrompt from 'inquirer-autocomplete-prompt';
import updateNotifier, { Settings } from 'update-notifier';
import { APP_DESCRIPTION, APP_NAME, APP_VERSION, GITHUB_BOILERPLATES_REPOSITORY, NODE_ENV, PACKAGE_JSON } from './configs/configs';
import { BoilerplateHandlerContext } from './strategies/BoilerplateHandler';
import { githubStrategy } from './strategies/GithubStrategy';
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
    boilerplatesArr: []
  };

  program.name(APP_NAME).version(APP_VERSION).description(APP_DESCRIPTION);
  program
    .option('-r, --repository <repo>', 'use your github boilerplates')
    .option('-p, --path <folder>', 'use only boilerplates from a specific local folder')
    .option('-f, --famous', 'use only famous boilerplates')
    .option('-l, --list', 'show the current boilerplate list');

  program.parse();
  const options = program.opts();

  /* ------------------------------------------------------------------------ */

  if (options.repository) {
    bpmInstance.source = options.repository;
    bpmInstance.sourceType = 'repository';
    bpmInstance.context = new BoilerplateHandlerContext(githubStrategy);
  }

  /* ------------------------------------------------------------------------ */

  if (['default', 'repository'].includes(bpmInstance.sourceType)) {
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

  inquirer.prompt(promptQuestions).then((answers) => {
    console.log(`answers: `, answers);
    bpmInstance.context.choose(bpmInstance.source, answers.boilerplate.name);
  });
}

/*

  if (options.famous) {
    bpmInstance.sourceType = 'famous';
    bpmInstance.boilerplatesArr = [];
    logger.info('using [famous] boilerplates');
  }

  if (options.starred) {
    bpmInstance.sourceType = 'starred';
    bpmInstance.boilerplatesArr = [];
    logger.info('using [starred] boilerplates');
  }

  if (options.path) {
    const folderPath = resolve(options.path);
    if (!existsSync(folderPath)) {
      logger.error(`folder path [${options.path}] does not exists`);
      process.exit(1);
    }

    bpmInstance.sourceType = `path`;
    bpmInstance.context.setStrategy(localpathStrategy);

    const localBoilerplatesArr = (await bpmInstance.context.list(folderPath)) ?? [];
    if (localBoilerplatesArr.length === 0) {
      logger.error('no boilerplates were found in the specified path.');
      process.exit(1);
    }

    bpmInstance.boilerplatesArr = localBoilerplatesArr;
    logger.info(`using boilerplates from folder: [${options.path}]`);
  }

  if (options.filter) {
    // prettier-ignore
    const filteredBoilerplates = bpmInstance.boilerplatesArr.filter((item: BoilerplateItem) => {
      const foundOnName = item.name.search(options.filter) > -1
      const foundOnCategory = item.category.search(options.filter) > -1
      const foundOnDescription = (item.description && item.description.search(options.filter) > -1)
      return foundOnName || foundOnCategory || foundOnDescription
    });

    bpmInstance.boilerplatesArr = filteredBoilerplates;
    logger.info(`filtered boilerplates with: [${options.filter}]`);
  }

  if (options.manageStarred) {
    console.log('');
    manageStarredBoilerplates();
  } else {
    if (bpmInstance.sourceType === `default`) {
      bpmInstance.boilerplatesArr = await bpmInstance.context.list(bpmInstance.source);
    }

    console.log(bpmInstance.boilerplatesArr);

    if (bpmInstance.boilerplatesArr.length === 0) {
      logger.error('current boilerplate list has no items!');
      process.exit(1);
    }

    logger.info(`current boilerplate list: [${bpmInstance.sourceType}]`);
    console.log('');

    if (options.addStarred) {
      starBoilerplates(bpmInstance);
    } else {
      selectBoilerplate(bpmInstance);
    }
  }

*/
