import axios from 'axios';
import { downloadGithubRepositoryFolder } from '../utils/download-github-repository-folder';
import { BoilerplateItem } from './BoilerplateItem';

interface BoilerplateHandlerStrategy {
  list(source: string): Promise<BoilerplateItem[]>;
  choose(source: string, name: string): Promise<boolean>;
  star(name: string): boolean;
  removeFromStarreds(name: string): boolean;
}

class BoilerplateHandlerContext {
  constructor(private strategy: BoilerplateHandlerStrategy) {
    this.strategy = strategy;
  }

  public setStrategy(strategy: BoilerplateHandlerStrategy) {
    this.strategy = strategy;
  }

  async list(source: string): Promise<BoilerplateItem[]> {
    return this.strategy.list(source);
  }

  async choose(source: string, name: string): Promise<boolean> {
    return this.strategy.choose(source, name);
  }

  star(name: string): boolean {
    return this.strategy.star(name);
  }

  removeFromStarreds(name: string): boolean {
    return this.strategy.removeFromStarreds(name);
  }
}

/* -------------------------------------------------------------------------- */

class GithubStrategy implements BoilerplateHandlerStrategy {
  async list(repoLink: string): Promise<BoilerplateItem[]> {
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

  async choose(source: string, name: string): Promise<boolean> {
    return downloadGithubRepositoryFolder(source, name);
  }

  star(name: string): boolean {
    console.log('name: ', name);
    return true;
  }

  removeFromStarreds(name: string): boolean {
    console.log('name: ', name);
    return true;
  }
}

class LocalpathStrategy implements BoilerplateHandlerStrategy {
  async list(path: string): Promise<BoilerplateItem[]> {
    console.log('path: ', path);
    return new Promise((resolve) => resolve([]));
  }

  choose(source: string, name: string): Promise<boolean> {
    console.log('name: ', name);
    console.log('source: ', source);
    return new Promise((resolve) => resolve(true));
  }

  star(name: string): boolean {
    console.log('name: ', name);
    return true;
  }

  removeFromStarreds(name: string): boolean {
    console.log('name: ', name);
    return true;
  }
}

const githubStrategy = new GithubStrategy();
const localpathStrategy = new LocalpathStrategy();

export { BoilerplateHandlerStrategy, BoilerplateHandlerContext, githubStrategy, localpathStrategy };
