import { rmSync } from 'fs';
import { join, resolve } from 'path';
import { BoilerplateInfo } from '../../types/Boilerplate';
import { RuntimeSettings } from '../../types/RuntimeSettings';
import { copyFolderSync } from '../../utils/fs-utils';

interface BoilerplateHandlerStrategy {
  list(source: string): Promise<BoilerplateInfo[]>;
  choose(runTime: RuntimeSettings, boilerCompleteName: string, tmpFolder?: string): Promise<boolean>;
}

class BoilerplateHandler {
  constructor(private strategy: BoilerplateHandlerStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: BoilerplateHandlerStrategy) {
    this.strategy = strategy;
  }

  async list(source: string): Promise<BoilerplateInfo[]> {
    return this.strategy.list(source);
  }

  async choose(runTime: RuntimeSettings, boilerName: string, tmpFolder: string): Promise<boolean> {
    const hasCreatedBoilerplate = await this.strategy.choose(runTime, boilerName, tmpFolder);

    if (hasCreatedBoilerplate) {
      const [, name] = boilerName.split('/');
      const localBoilerplatePath = resolve(join('./', name));
      copyFolderSync(tmpFolder, localBoilerplatePath);
    }

    rmSync(tmpFolder, { recursive: true });

    return hasCreatedBoilerplate;
  }
}

/* -------------------------------------------------------------------------- */

export { BoilerplateHandlerStrategy, BoilerplateHandler };
