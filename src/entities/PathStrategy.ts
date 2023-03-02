import chalk from 'chalk';
import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { BOILERPLATES_DEFAULT_INFO_FILE } from '../configs/configs';
import { Boilerplate } from '../types/Boilerplate';
import { RuntimeSettings } from '../types/RuntimeSettings';
import { copyFolderSync } from '../utils/fs-utils';
import { logger } from '../utils/logger';
import { readJson } from '../utils/read-json';
import { BoilerplateHandlerStrategy } from './BoilerplateHandler';

class PathStrategy implements BoilerplateHandlerStrategy {
  async list(path: string): Promise<Boilerplate[]> {
    logger.info(`folder: ${chalk.blue(path)}`);
    const allBoilerplatesInfo = readJson(`${path}/${BOILERPLATES_DEFAULT_INFO_FILE}`) as Boilerplate[];
    return new Promise((resolve) => resolve(allBoilerplatesInfo));
  }

  choose(runTime: RuntimeSettings, name: string): Promise<boolean> {
    const choosedBoilerplate = runTime.boilerplatesArr.find((item) => item.name === name);
    const folderPath = resolve(join(runTime.options.folder, choosedBoilerplate?.folder ?? ''));

    if (!existsSync(folderPath)) {
      logger.error(`folder path [${folderPath}] does not exists`);
      process.exit(1);
    }

    const finalFolder = resolve(`./${name}`);
    copyFolderSync(folderPath, finalFolder);

    return new Promise((resolve) => resolve(existsSync(finalFolder)));
  }
}

const pathStrategy = new PathStrategy();

export { pathStrategy };
