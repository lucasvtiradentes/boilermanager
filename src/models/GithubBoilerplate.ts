import axios from 'axios';
import { GITHUB_BOILERPLATES_REPOSITORY } from '../configs/configs';
import { BoilerplatesHandler } from '../entities/BoilerplatesHandler';
import downloadRepositoryFolder from './DownloadRepositoryFolder';

class GithubBoilerplatehandler implements BoilerplatesHandler {
  source: string = '';
  curlist: string[] = [];

  async list(repoLink: string): Promise<string[]> {
    this.source = repoLink;
    // const folderUrl = `https://api.github.com/repos/${repo}/contents/`;
    const treeUrl = `https://api.github.com/repos/${repoLink}/git/trees/master?recursive=1`;
    const boilerplateList = await axios.get(treeUrl);
    const parsedResults = boilerplateList.data.tree.filter((item: any) => item.path.split('/').length === 2 && item.type === 'tree').map((item: any) => item.path.split('/')[1]);
    this.curlist = parsedResults;
    console.log(parsedResults);
    return parsedResults;
  }

  select(name: string): boolean {
    console.log(`select from github ${name}`);

    downloadRepositoryFolder.execute(GITHUB_BOILERPLATES_REPOSITORY, name);
    return true;
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
