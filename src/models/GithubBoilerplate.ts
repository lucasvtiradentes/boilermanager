import axios from 'axios';
import { BoilerplatesHandler } from '../entities/BoilerplatesHandler.js';

class GithubBoilerplatehandler implements BoilerplatesHandler {
  source: string = '';
  curlist: string[] = [];

  async list(repoLink: string): Promise<string[]> {
    this.source = repoLink;
    // const folderUrl = `https://api.github.com/repos/${repo}/contents/`;
    const treeUrl = `https://api.github.com/repos/${repoLink}/git/trees/master?recursive=1`;
    console.log(treeUrl);
    const boilerplateList = await axios.get(treeUrl);
    const parsedResults = boilerplateList.data.tree.filter((item: any) => item.path.split('/').length === 2 && item.type === 'tree').map((item: any) => item.path.split('/')[1]);
    this.curlist = parsedResults;
    console.log(parsedResults);
    return parsedResults;
  }

  select(): void {
    throw new Error('Method not implemented.');
  }

  addAsStarred(): void {
    throw new Error('Method not implemented.');
  }

  removeFromStarred(): void {
    throw new Error('Method not implemented.');
  }
}

const githubBoilerplatehandler = new GithubBoilerplatehandler();

export default githubBoilerplatehandler;
