import { copyFileSync, existsSync, lstatSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';

function deleteFolder(path: string) {
  if (existsSync(path)) {
    rmSync(path, { recursive: true });
  }
}

function copyFolderSync(from: string, to: string) {
  if (!existsSync(to)) {
    mkdirSync(to);
  }

  readdirSync(from).forEach((element) => {
    if (lstatSync(join(from, element)).isFile()) {
      copyFileSync(join(from, element), join(to, element));
    } else {
      copyFolderSync(join(from, element), join(to, element));
    }
  });
}

export { deleteFolder, copyFolderSync };
