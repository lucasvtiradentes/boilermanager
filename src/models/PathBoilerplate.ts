import { BoilerplatesHandler } from '../entities/BoilerplatesHandler.js';
import { readdirSync } from 'node:fs';

class PathBoilerplatehandler implements BoilerplatesHandler {
  source: string = '';
  curlist: string[] = [];

  async list(location: string): Promise<string[]> {
    const getDirectories = (source: string) =>
      readdirSync(source, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);

    return getDirectories(location).map((item) => item);
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

const pathBoilerplatehandler = new PathBoilerplatehandler();
export default pathBoilerplatehandler;
