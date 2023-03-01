import axios from 'axios';
import { downloadGithubRepositoryFolder } from '../utils/download-github-repository-folder';
import { Boilerplate } from '../types/Boilerplate';
import { BoilerplateHandlerStrategy } from './BoilerplateHandler';
import { BOILERPLATES_DEFAULT_INFO_FILE } from '../configs/configs';

class GithubStrategy implements BoilerplateHandlerStrategy {
  async list(githubRepository: string): Promise<Boilerplate[]> {
    const link = `https://raw.githubusercontent.com/${githubRepository}/master/${BOILERPLATES_DEFAULT_INFO_FILE}`;

    try {
      const boilerplateList = await axios.get(link);
      const boilers = boilerplateList.data;
      return boilers;
    } catch (e: any) {
      return [];
    }
  }

  async choose(source: string, name: string): Promise<boolean> {
    return downloadGithubRepositoryFolder(source, name);
  }
}

const githubStrategy = new GithubStrategy();

export { githubStrategy };

/*

  async listOldWay(repoLink: string): Promise<Boilerplate[]> {
    // const folderUrl = `https://api.github.com/repos/${repo}/contents/`;
    const treeUrl = `https://api.github.com/repos/${repoLink}/git/trees/master?recursive=1`;
    try {
      const boilerplateList = await axios.get(treeUrl);
      const parsedResults = boilerplateList.data.tree
        .filter((item: any) => {
          const pathArr = item.path.split('/');
          return pathArr.length === 3 && pathArr[0] === 'boilerplates' && item.type === 'tree';
        })
        .map((item: any) => item.path);
      const finalResults = parsedResults.map((item: string) => {
        return {
          origin: 'github',
          source: repoLink,
          category: item.split('/')[1],
          name: item.split('/')[2],
          description: ''
        };
      });
      return finalResults;
    } catch (e: any) {
      return [];
    }
  }
*/
