import { execSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { copyFileSync, existsSync, lstatSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { logger } from './logger.js';

class UseGithubBoilerplate {
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

  execute(repositoryLink: string, folder: string) {
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
      `git remote add -f origin ${repositoryLink}`,
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

    const downloadedFolder = join(tmpFolder, folder);

    if (!existsSync(downloadedFolder)) {
      rmSync(tmpFolder, { recursive: true });
      logger.error('specified folder couldnt be downloaded!');
      return false;
    }

    this.copyFolderSync(downloadedFolder, './tora');
    rmSync(tmpFolder, { recursive: true });
    return true;
  }
}

const useGithubBoilerplate = new UseGithubBoilerplate();

export default useGithubBoilerplate;
