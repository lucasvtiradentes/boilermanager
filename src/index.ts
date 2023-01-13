#! /usr/bin/env node

import chalk from 'chalk';
import figlet from 'figlet';
import { program } from 'commander';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { DESCRIPTION, GITHUB_BOILERPLATES_REPOSITORY, VERSION } from './configs/configs';
import { manageStarredBoilerplates } from './interaction/manage-starred-boilerplates';
import { selectBoilerplate } from './interaction/select-boilerplate';
import { starBoilerplates } from './interaction/star-boilerplates';
import githubBoilerplatehandler from './models/GithubBoilerplate';
import pathBoilerplatehandler from './models/PathBoilerplate';
import { logger } from './utils/logger';
import { BoilerplatesHandler } from './entities/BoilerplatesHandler';

interface runTimeProperties {
  boilerHandler: BoilerplatesHandler;
  boilerplateOrigin: 'default' | 'famous' | 'starred' | 'path';
  boilerplatesArr: string[];
}

async function initBoilerplateManager() {
  let runtimeObj: runTimeProperties = {
    boilerHandler: githubBoilerplatehandler,
    boilerplateOrigin: 'default',
    boilerplatesArr: await githubBoilerplatehandler.list(GITHUB_BOILERPLATES_REPOSITORY)
  };

  console.log(chalk.red(figlet.textSync('boilermanager', { horizontalLayout: 'full' })));

  program.name('boilermanager').version(VERSION).description(DESCRIPTION);

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
    runtimeObj.boilerplateOrigin = 'famous';
    runtimeObj.boilerplatesArr = [];
    logger.info('using [famous] boilerplates');
  }

  /* ========================================================================== */

  if (options.starred) {
    runtimeObj.boilerplateOrigin = 'starred';
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

    const localBoilerplatesArr = (await pathBoilerplatehandler.list(folderPath)) ?? [];
    if (localBoilerplatesArr.length === 0) {
      logger.error('no boilerplates were found in the specified path.');
      process.exit(1);
    }

    runtimeObj.boilerplateOrigin = `path`;
    runtimeObj.boilerHandler = pathBoilerplatehandler;
    runtimeObj.boilerplatesArr = localBoilerplatesArr;

    logger.info(`using boilerplates from folder: [${options.path}]`);
  }

  /* ========================================================================== */

  if (options.filter) {
    const filteredBoilerplates = runtimeObj.boilerplatesArr.filter((item: string) => item.search(options.filter) > -1);
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

  if (runtimeObj.boilerplatesArr.length === 0) {
    logger.error('current boilerplate list has no items!');
    process.exit(1);
  }

  /* ========================================================================== */

  if (options.manageStarred) {
    console.log('');
    manageStarredBoilerplates();
  } else if (options.addStarred) {
    logger.info(`current boilerplate list: [${runtimeObj.boilerplateOrigin}]`);
    console.log('');
    starBoilerplates(runtimeObj.boilerplatesArr);
  } else {
    logger.info(`current boilerplate list: [${runtimeObj.boilerplateOrigin}]`);
    console.log('');
    selectBoilerplate(runtimeObj.boilerplatesArr, runtimeObj.boilerHandler);
  }
}

initBoilerplateManager();
