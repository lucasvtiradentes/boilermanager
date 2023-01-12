import axios from 'axios';
import { execSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { logger } from '../src/utils/logger.js';
import { existsSync, mkdirSync } from 'node:fs';

function cloneRepositoryFolder(repositoryLink: string, folder: string) {
  const defaultExecConfigs = { encoding: 'utf8', timeout: 10000 } as any;

  const isGitInstalled = execSync('git -v', defaultExecConfigs).search('git version') > -1;
  if (!isGitInstalled) {
    logger.error('git is not installed in this computer!');
    return;
  }

  const downloadFolder = join(tmpdir(), `bpm-${randomUUID()}`);
  if (existsSync(downloadFolder)) {
    logger.error('tmp folder somehow exists!');
    return;
  }

  console.log('downloadFolder: ', downloadFolder);
  mkdirSync(downloadFolder);

  const commands = ['git init', `git remote add -f origin ${repositoryLink}`, 'git config core.sparseCheckout true', 'pwd'];

  for (let x = 0; x < commands.length; x++) {
    console.log(commands[x]);
    execSync(commands[x], defaultExecConfigs);
  }
}

cloneRepositoryFolder('1', '2');

// const repo = 'ts-boilerplate-land/ts-boilerplates';
// const folderUrl = `https://api.github.com/repos/${repo}/contents/`;
// const treeUrl = `https://api.github.com/repos/${repo}/git/trees/master?recursive=1`;

// axios
//   .get(folderUrl)
//   .then((data) => data.data)
//   .then((res) => {
//     console.log(res.map((item: any) => item.name));
//     // console.log(res.tree.map((item: any) => item.path));
//   });
