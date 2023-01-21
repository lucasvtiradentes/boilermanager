import { BoilerplateItem } from './entities/BoilerplateItem';
import chalk from 'chalk';
import figlet from 'figlet';
import { program } from 'commander';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { APP_NAME, APP_DESCRIPTION, APP_VERSION, GITHUB_BOILERPLATES_REPOSITORY } from './configs/configs';
import { manageStarredBoilerplates } from './interaction/manage-starred-boilerplates';
import { selectBoilerplate } from './interaction/select-boilerplate';
import { starBoilerplates } from './interaction/star-boilerplates';
import { logger } from './utils/logger';
import { RuntimeSettings } from './entities/RuntimeSettings';
import { BoilerplateHandlerContext, githubStrategy, localpathStrategy } from './entities/BoilerplateHandler';

async function initBoilerplateManager() {
  const runtimeObj: RuntimeSettings = {
    source: GITHUB_BOILERPLATES_REPOSITORY,
    sourceType: 'default',
    context: new BoilerplateHandlerContext(githubStrategy),
    boilerplatesArr: []
  };

  console.log(chalk.red(figlet.textSync(APP_NAME, { horizontalLayout: 'full' })));
  program.name(APP_NAME).version(APP_VERSION).description(APP_DESCRIPTION);
  program
    .option('-fb, --famous', 'use only famous boilerplates')
    .option('-sb, --starred', 'use only starred boilerplates')
    .option('-pb, --path <folder>', 'use only boilerplates from a specific local folder')
    .option('-f, --filter <keyword>', 'shows only filtered boilerplates')
    .option('-l, --list', 'show the current boilerplate list')
    .option('-ld, --list-detailed', 'show the current boilerplate list with descriptions')
    .option('-as, --add-starred', 'shows the current boilerplate list in order to starred some of them')
    .option('-ms, --manage-starred', 'manage the current starred boilerplate list in order to remove the unused ones');

  program.parse();
  const options = program.opts();
  // console.log('options: ', options)

  /* ========================================================================== */

  if (options.famous) {
    runtimeObj.sourceType = 'famous';
    runtimeObj.boilerplatesArr = [];
    logger.info('using [famous] boilerplates');
  }

  /* ========================================================================== */

  if (options.starred) {
    runtimeObj.sourceType = 'starred';
    runtimeObj.boilerplatesArr = [];
    logger.info('using [starred] boilerplates');
  }

  /* ========================================================================== */

  if (options.path) {
    const folderPath = resolve(options.path);
    if (!existsSync(folderPath)) {
      logger.error(`folder path [${options.path}] does not exists`);
      process.exit(1);
    }

    runtimeObj.sourceType = `path`;
    runtimeObj.context.setStrategy(localpathStrategy);

    const localBoilerplatesArr = (await runtimeObj.context.list(folderPath)) ?? [];
    if (localBoilerplatesArr.length === 0) {
      logger.error('no boilerplates were found in the specified path.');
      process.exit(1);
    }

    runtimeObj.boilerplatesArr = localBoilerplatesArr;
    logger.info(`using boilerplates from folder: [${options.path}]`);
  }

  /* ========================================================================== */

  if (options.filter) {
    // prettier-ignore
    const filteredBoilerplates = runtimeObj.boilerplatesArr.filter((item: BoilerplateItem) => {
      const foundOnName = item.name.search(options.filter) > -1
      const foundOnCategory = item.category.search(options.filter) > -1
      const foundOnDescription = (item.description && item.description.search(options.filter) > -1)
      return foundOnName || foundOnCategory || foundOnDescription
    });

    runtimeObj.boilerplatesArr = filteredBoilerplates;
    logger.info(`filtered boilerplates with: [${options.filter}]`);
  }

  /* ========================================================================== */

  if (options.list) {
    console.table(runtimeObj.boilerplatesArr.map((item) => item));
    process.exit(0);
  }

  if (options.listDetailed) {
    const detailedList = runtimeObj.boilerplatesArr.map((item) => item);
    console.table(detailedList);
    process.exit(0);
  }

  /* ========================================================================== */

  if (options.manageStarred) {
    console.log('');
    manageStarredBoilerplates();
  } else {
    if (runtimeObj.sourceType === `default`) {
      runtimeObj.boilerplatesArr = await runtimeObj.context.list(runtimeObj.source);
    }

    if (runtimeObj.boilerplatesArr.length === 0) {
      logger.error('current boilerplate list has no items!');
      process.exit(1);
    }

    logger.info(`current boilerplate list: [${runtimeObj.sourceType}]`);
    console.log('');

    if (options.addStarred) {
      starBoilerplates(runtimeObj);
    } else {
      selectBoilerplate(runtimeObj);
    }
  }
}

initBoilerplateManager();
