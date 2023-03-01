import { Boilerplate } from '../types/Boilerplate';
import { BoilerplateHandlerStrategy } from './BoilerplateHandler';

class PathStrategy implements BoilerplateHandlerStrategy {
  async list(path: string): Promise<Boilerplate[]> {
    console.log('path: ', path);
    return new Promise((resolve) => resolve([]));
  }

  choose(source: string, name: string): Promise<boolean> {
    console.log('name: ', name);
    console.log('source: ', source);
    return new Promise((resolve) => resolve(true));
  }
}

const pathStrategy = new PathStrategy();

export { pathStrategy };
