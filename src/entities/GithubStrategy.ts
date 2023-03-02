import axios from 'axios';
import { downloadGithubRepositoryFolder } from '../utils/download-github-repository-folder';
import { Boilerplate } from '../types/Boilerplate';
import { BoilerplateHandlerStrategy } from './BoilerplateHandler';
import { BOILERPLATES_INFO_FILE } from '../configs/configs';
import { RuntimeSettings } from '../types/RuntimeSettings';
import { logger } from '../utils/logger';
import chalk from 'chalk';

class GithubStrategy implements BoilerplateHandlerStrategy {
  async list(githubRepository: string): Promise<Boilerplate[]> {
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

  async choose(runTime: RuntimeSettings, name: string): Promise<boolean> {
    return downloadGithubRepositoryFolder(runTime.source, name);
  }
}

const githubStrategy = new GithubStrategy();

export { githubStrategy };
