import { execSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { existsSync, mkdirSync, rmSync } from 'node:fs';
import { tmpdir, platform } from 'node:os';
import { join, resolve } from 'node:path';
import { copyFolderSync, getDirectoriesRecursive } from '../utils/fs-utils';
import { logger } from '../utils/logger';

function downloadGithubRepositoryFolder(repositoryName: string, folder: string) {
  try {
    const defaultExecConfigs = { encoding: 'utf8', timeout: 10000 } as any;

    const isGitInstalled = execSync('git --version', defaultExecConfigs).search('git version') > -1;
    if (!isGitInstalled) {
      throw new Error('git is not installed in this computer!');
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
      const curCommand = `${changeDirCommand} && ${commands[x]}`;
      try {
        execSync(curCommand, { ...defaultExecConfigs, detached: true, stdio: 'ignore' });
      } catch (e: any) {
        rmSync(tmpFolder, { recursive: true });
        throw new Error(e.message);
      }
    }

    const separator = platform() === 'win32' ? '\\' : '/';

    const allFolders = getDirectoriesRecursive(tmpFolder)
      .filter((folder: string) => folder.search('.git') === -1)
      .map((folder) => folder.replace(tmpFolder, ''))
      .reverse(); // solves the problem of boilerplate with the same name as its category

    const filteredArr = allFolders.filter((item) => {
      const tmpArr = item.split(separator);
      return tmpArr[tmpArr.length - 1] === folder;
    });

    const downloadedFolder = filteredArr.length > 0 ? join(tmpFolder, filteredArr[0]) : '';

    if (!existsSync(downloadedFolder)) {
      rmSync(tmpFolder, { recursive: true });
      throw new Error('specified folder couldnt be downloaded!');
    }

    const finalFolder = resolve(`./${folder}`);
    copyFolderSync(downloadedFolder, finalFolder);

    rmSync(tmpFolder, { recursive: true });
    return existsSync(finalFolder);
  } catch (e: any) {
    logger.error(e.message);
    if (e.message === 'spawnSync /bin/sh ETIMEDOUT') {
      // handle strange error
    }
    return false;
  }
}

export { downloadGithubRepositoryFolder };
