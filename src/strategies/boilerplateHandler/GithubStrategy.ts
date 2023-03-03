import axios from 'axios';
import chalk from 'chalk';
import { BOILERPLATES_DEFAULT_FOLDER, BOILERPLATES_INFO_FILE } from '../../configs/configs';
import { BoilerplateInfo } from '../../types/Boilerplate';
import { RuntimeSettings } from '../../types/RuntimeSettings';
import { logger } from '../../utils/logger';
import { DownloadGithubFolderStrategy } from '../downloadGithubFolder/DownloadGithubFolderHandler';
import { BoilerplateHandlerStrategy } from './BoilerplateHandler';

class GithubStrategy implements BoilerplateHandlerStrategy {
  handlerStrategy: DownloadGithubFolderStrategy;

  constructor(handlerStrategy: DownloadGithubFolderStrategy) {
    this.handlerStrategy = handlerStrategy;
  }

  async list(githubRepository: string): Promise<BoilerplateInfo[]> {
    logger.info(`repository: ${chalk.blue(githubRepository)}`);

    const link = `https://raw.githubusercontent.com/${githubRepository}/master/${BOILERPLATES_INFO_FILE}`;

    try {
      const boilerplateList = await axios.get(link);
      const boilers = boilerplateList.data;
      return boilers;
    } catch (e: any) {
      return [];
    }
  }

  async choose(runTime: RuntimeSettings, boilerCompleteName: string, tmpFolder: string): Promise<boolean> {
    const remoteBoilerplatePath = `${BOILERPLATES_DEFAULT_FOLDER}/${boilerCompleteName}`;
    const hasDownloadBoilerplate = await this.handlerStrategy.download(runTime.source, remoteBoilerplatePath, tmpFolder);
    return hasDownloadBoilerplate;
  }
}

export { GithubStrategy };
