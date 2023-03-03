import chalk from 'chalk';
import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { BOILERPLATES_DEFAULT_INFO_FILE } from '../../configs/configs';
import { BoilerplateInfo } from '../../types/Boilerplate';
import { RuntimeSettings } from '../../types/RuntimeSettings';
import { errorHandler } from '../../utils/error-handler';
import { copyFolderSync } from '../../utils/fs-utils';
import { logger } from '../../utils/logger';
import { readJson } from '../../utils/read-json';
import { BoilerplateHandlerStrategy } from './BoilerplateHandler';

class PathStrategy implements BoilerplateHandlerStrategy {
  async list(path: string): Promise<BoilerplateInfo[]> {
    logger.info(`folder: ${chalk.blue(path)}`);

    const jsonFilePath = `${path}/${BOILERPLATES_DEFAULT_INFO_FILE}`;
    if (!existsSync(jsonFilePath)) {
      errorHandler(`boilerplates path does not contain the required info file [${chalk.red(BOILERPLATES_DEFAULT_INFO_FILE)}]!`);
    }

    const allBoilerplatesInfo = readJson(jsonFilePath) as BoilerplateInfo[];
    return allBoilerplatesInfo;
  }

  async choose(runTime: RuntimeSettings, boilerCompleteName: string): Promise<boolean> {
    const [, boilerName] = boilerCompleteName.split('/');
    const folderPath = resolve(join(runTime.options.folder, boilerCompleteName));

    if (!existsSync(folderPath)) {
      errorHandler(`folder path [${folderPath}] does not exists`);
    }

    const finalFolder = resolve(`./${boilerName}`);
    copyFolderSync(folderPath, finalFolder);

    return existsSync(finalFolder);
  }
}

export { PathStrategy };
