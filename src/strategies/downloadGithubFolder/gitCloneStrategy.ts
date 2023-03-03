import { execSync } from 'node:child_process';
import { existsSync, renameSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { copyFolderSync } from '../../utils/fs-utils';
import { logger } from '../../utils/logger';
import { DownloadGithubFolderStrategy } from './DownloadGithubFolderHandler';

class GitCloneStrategy implements DownloadGithubFolderStrategy {
  defaultExecConfigs: any = { encoding: 'utf8', timeout: 10000 };

  private checkIfGitIsInstaled() {
    const isGitInstalled = execSync('git --version', this.defaultExecConfigs).search('git version') > -1;
    return isGitInstalled;
  }

  /* ------------------------------------------------------------------------ */

  async download(repository: string, repoPath: string, tempFolder: string): Promise<boolean> {
    const isGitInstalled = this.checkIfGitIsInstaled();
    if (!isGitInstalled) {
      throw new Error('git is not installed in this computer!');
    }

    const changeDirCommand = `cd ${tempFolder}`;
    // prettier-ignore
    const commands = [
      'git init',
      `git remote add -f origin https://github.com/${repository}.git`,
      'git config core.sparseCheckout true',
      `echo ${repoPath} >> .git/info/sparse-checkout`,
      'git pull origin master'
    ];

    for (let x = 0; x < commands.length; x++) {
      const curCommand = `${changeDirCommand} && ${commands[x]}`;
      try {
        execSync(curCommand, { ...this.defaultExecConfigs, detached: true, stdio: 'ignore' });
      } catch (e: any) {
        logger.info(e.message);
        return false;
      }
    }

    const newTmpFolder = `${tempFolder}_BAK`;
    renameSync(tempFolder, newTmpFolder);
    copyFolderSync(join(newTmpFolder, repoPath), tempFolder);
    rmSync(newTmpFolder, { recursive: true });

    return existsSync(tempFolder);
  }
}

export { GitCloneStrategy };
