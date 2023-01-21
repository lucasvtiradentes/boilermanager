import { copyFileSync, lstatSync, mkdirSync, readdirSync, statSync, readdir } from 'node:fs';
import { join, resolve } from 'node:path';

function copyFolderSync(from: string, to: string) {
  mkdirSync(to);
  readdirSync(from).forEach((element) => {
    if (lstatSync(join(from, element)).isFile()) {
      copyFileSync(join(from, element), join(to, element));
    } else {
      copyFolderSync(join(from, element), join(to, element));
    }
  });
}

function getDirectoriesRecursive(srcpath: string): string[] {
  return [
    srcpath,
    ...readdirSync(srcpath)
      .map((file: string) => join(srcpath, file))
      .filter((path: string) => statSync(path).isDirectory())
      .map((item) => getDirectoriesRecursive(item))
      .reduce((a: any, b: any) => a.concat(b), [])
  ];
}

// async function getAllFolderFiles(dir: string) {
//   const dirents = await readdir(dir, { withFileTypes: true });
//   const files: any = await Promise.all(
//     dirents.map((dirent: any) => {
//       const res = resolve(dir, dirent.name);
//       return dirent.isDirectory() ? getAllFolderFiles(res) : res;
//     })
//   );
//   return Array.prototype.concat(...files);
// }

export { copyFolderSync, getDirectoriesRecursive };
