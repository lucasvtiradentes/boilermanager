#! /usr/bin/env node

import chalk from 'chalk';
import figlet from 'figlet';
import { program } from 'commander';
import { resolve } from 'node:path';
import { existsSync } from 'node:fs';
import { getBoilerplatesFromFolder } from './utils/get-boilerplates-from-folder.js';
import { getGithubBoilerplates } from './utils/get-github-boilerplates.js';
import { Boilerplate } from './types/Boilerplate.js';
import { starBoilerplates } from './interaction/star-boilerplates.js';
import { selectBoilerplate } from './interaction/select-boilerplate.js';
import { manageStarredBoilerplates } from './interaction/manage-starred-boilerplates.js';
import { logger } from './utils/logger.js';

async function initBoilerplateManager() {
  let CURRENT_BOILERPALTE_NAME = 'DEFAULT';
  let CURRENT_BOILERPLATES: Boilerplate[] = await getGithubBoilerplates();

  console.log(chalk.red(figlet.textSync('boilermanager', { horizontalLayout: 'full' })));

  program.name('boilermanager').version('0.0.1').description('A complete typescript boilerplate library to fast quick start your projects.');

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
    CURRENT_BOILERPALTE_NAME = 'famous';
    CURRENT_BOILERPLATES = [];
    logger.info('using [famous] boilerplates');
  }

  /* ========================================================================== */

  if (options.starred) {
    CURRENT_BOILERPALTE_NAME = 'starred';
    CURRENT_BOILERPLATES = [];
    logger.info('using [starred] boilerplates');
  }

  /* ========================================================================== */

  if (options.path) {
    const folderPath = resolve(options.path);
    if (!existsSync(folderPath)) {
      logger.error(`folder path [${options.path}] does not exists`);
      process.exit(1);
    }

    const localBoilerplatesArr = getBoilerplatesFromFolder(folderPath) ?? [];
    if (localBoilerplatesArr.length === 0) {
      logger.error('no boilerplates were found in the specified path.');
      process.exit(1);
    }

    CURRENT_BOILERPALTE_NAME = `local folder`;
    CURRENT_BOILERPLATES = localBoilerplatesArr;
    logger.info(`using boilerplates from folder: [${options.path}]`);
  }

  /* ========================================================================== */

  if (options.filter) {
    const filteredBoilerplates = CURRENT_BOILERPLATES.filter((item: Boilerplate) => item.name.search(options.filter) > -1);
    CURRENT_BOILERPLATES = filteredBoilerplates;
    logger.info(`filtered boilerplates with: [${options.filter}]`);
  }

  /* ========================================================================== */

  if (options.list) {
    console.table(CURRENT_BOILERPLATES.map((item) => item.name));
    process.exit(0);
  }

  if (options.listDetailed) {
    const detailedList = CURRENT_BOILERPLATES.map((item) => ({
      name: item.name,
      description: item.description
    }));
    console.table(detailedList);
    process.exit(0);
  }

  /* ========================================================================== */

  if (CURRENT_BOILERPLATES.length === 0) {
    logger.error('current boilerplate list has no items!');
    process.exit(1);
  }

  /* ========================================================================== */

  if (options.manageStarred) {
    console.log('');
    manageStarredBoilerplates();
  } else if (options.addStarred) {
    logger.info(`current boilerpalte list: [${CURRENT_BOILERPALTE_NAME}]`);
    console.log('');
    starBoilerplates(CURRENT_BOILERPLATES);
  } else {
    logger.info(`current boilerpalte list: [${CURRENT_BOILERPALTE_NAME}]`);
    console.log('');
    selectBoilerplate(CURRENT_BOILERPLATES);
  }
}

initBoilerplateManager();
