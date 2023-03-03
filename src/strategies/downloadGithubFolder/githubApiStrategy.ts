import axios from 'axios';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';
import { errorHandler } from '../../utils/error-handler';
import { DownloadGithubFolderStrategy } from './DownloadGithubFolderHandler';

type GithubI = {
  path: string;
  mode: string;
  type: 'blob' | 'tree';
  sha: string;
  size?: number;
  url: string;
};

class GithubApiStrategy implements DownloadGithubFolderStrategy {
  private getFolderGithubSha(repository: string, repoPath: string): Promise<string | false> {
    return new Promise((resolve) => {
      const url = `https://api.github.com/repos/${repository}/git/trees/master?recursive=1`;

      axios(url)
        .then((response) => {
          const allTree = response.data.tree;

          const repoPathItem = allTree.find((item: any) => {
            const isFolder = item.type === 'tree';
            const isFolderNameEqual = item.path === repoPath;
            return isFolder && isFolderNameEqual;
          });

          if (!repoPathItem.sha) {
            errorHandler('path was not found');
            resolve(false);
          }

          resolve(repoPathItem.sha);
        })
        .catch((err) => {
          errorHandler(err.response.data.message);
          resolve(false);
        });
    });
  }

  private getAllFolderContents(repository: string, repositoryFolderSha: string): Promise<GithubI[] | false> {
    return new Promise((resolve) => {
      const url = `https://api.github.com/repos/${repository}/git/trees/${repositoryFolderSha}?recursive=1`;

      axios(url)
        .then((response) => {
          const items = response.data.tree as GithubI[];
          resolve(items);
        })
        .catch((err) => {
          errorHandler(err.response.data.message);
          resolve(false);
        });
    });
  }

  private createAllFolders(allItems: GithubI[], finalPath: string) {
    const onlyFolders = allItems.filter((item) => item.type === 'tree');

    // prettier-ignore
    onlyFolders.map((item) => item.path).forEach((folder) => {
    const finalFolder = resolve(join(finalPath, folder));
    if (!existsSync(finalFolder)) {
      mkdirSync(finalFolder, { recursive: true });
    }
  });
  }

  private async downloadAllFiles(allItems: GithubI[], finalPath: string): Promise<boolean> {
    const onlyFiles = allItems.filter((item) => item.type === 'blob');

    for (const file of onlyFiles) {
      const finalFilePath = resolve(join(finalPath, file.path));

      try {
        const fileContent = await axios(file.url);
        const base64FileContent = Buffer.from(fileContent.data.content, 'base64');
        writeFileSync(finalFilePath, base64FileContent);
      } catch (e: any) {
        errorHandler(e.response.data.message);
        return false;
      }
    }

    return true;
  }

  /* ------------------------------------------------------------------------ */

  async download(repository: string, repoPath: string, tempFolder: string): Promise<boolean> {
    const folderSha = await this.getFolderGithubSha(repository, repoPath);
    if (!folderSha) {
      return false;
    }

    const allItems = await this.getAllFolderContents(repository, folderSha);
    if (!allItems) {
      return false;
    }

    this.createAllFolders(allItems, tempFolder);

    const hasDownloadedAllFiles = await this.downloadAllFiles(allItems, tempFolder);
    return hasDownloadedAllFiles;
  }
}

export { GithubApiStrategy };
