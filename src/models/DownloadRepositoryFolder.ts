import { execSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { copyFileSync, existsSync, lstatSync, mkdirSync, readdirSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { logger } from '../utils/logger';
import { readdir } from 'fs/promises';

class DownloadRepositoryFolder {
  private copyFolderSync(from: string, to: string) {
    mkdirSync(to);
    readdirSync(from).forEach((element) => {
      if (lstatSync(join(from, element)).isFile()) {
        copyFileSync(join(from, element), join(to, element));
      } else {
        this.copyFolderSync(join(from, element), join(to, element));
      }
    });
  }

  private getDirectoriesRecursive(srcpath: string): string[] {
    return [
      srcpath,
      ...readdirSync(srcpath)
        .map((file: string) => join(srcpath, file))
        .filter((path: string) => statSync(path).isDirectory())
        .map((item) => this.getDirectoriesRecursive(item))
        .reduce((a: any, b: any) => a.concat(b), [])
    ];
  }
  execute(repositoryName: string, folder: string) {
    const defaultExecConfigs = { encoding: 'utf8', timeout: 10000 } as any;

    const isGitInstalled = execSync('git -v', defaultExecConfigs).search('git version') > -1;
    if (!isGitInstalled) {
      logger.error('git is not installed in this computer!');
      return false;
    }

    const tmpFolder = join(tmpdir(), `bpm-${randomUUID()}`);
    if (existsSync(tmpFolder)) {
      rmSync(tmpFolder, { recursive: true });
    }

    mkdirSync(tmpFolder);

    const changeDirCommand = `cd ${tmpFolder}`;
    // prettier-ignore
    const commands = [
      'git init',
      `git remote add -f origin https://github.com/${repositoryName}.git`,
      'git config core.sparseCheckout true',
      `echo ${folder} >> .git/info/sparse-checkout`,
      'git pull origin master'
    ];

    for (let x = 0; x < commands.length; x++) {
      try {
        const curCommand = `${changeDirCommand} && ${commands[x]}`;
        execSync(curCommand, { ...defaultExecConfigs, stdio: 'ignore' });
      } catch (e: any) {
        rmSync(tmpFolder, { recursive: true });
        logger.error(e.message);
        return false;
      }
    }

    const filteredArr = this.getDirectoriesRecursive(tmpFolder).filter((item) => item.split('\\')[item.split('\\').length - 1] === folder);
    const downloadedFolder = filteredArr.length > 0 ? filteredArr[0] : '';

    if (!existsSync(downloadedFolder)) {
      rmSync(tmpFolder, { recursive: true });
      logger.error('specified folder couldnt be downloaded!');
      return false;
    }

    this.copyFolderSync(downloadedFolder, `./${folder}`);
    rmSync(tmpFolder, { recursive: true });
    return true;
  }
}

const downloadRepositoryFolder = new DownloadRepositoryFolder();

export default downloadRepositoryFolder;
