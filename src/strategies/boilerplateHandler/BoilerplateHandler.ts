import chalk from 'chalk';
import { rmSync } from 'fs';
import { join, resolve } from 'path';
import { BoilerplateInfo, BoilerplateSchema } from '../../types/Boilerplate';
import { RuntimeSettings } from '../../types/RuntimeSettings';
import { copyFolderSync } from '../../utils/fs-utils';
import { logger } from '../../utils/logger';
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

  validateList(boilerplateArr: BoilerplateInfo[]) {
    const onlyValidItems = boilerplateArr.filter((boiler) => BoilerplateSchema.safeParse(boiler).success);
    return onlyValidItems;
  }

  async list(source: string): Promise<BoilerplateInfo[]> {
    const boilerplateArr = await this.strategy.list(source);
    const validBoilerplateArr = this.validateList(boilerplateArr);

    const removedBoilerplates = boilerplateArr.length - validBoilerplateArr.length;
    if (removedBoilerplates !== 0) {
      logger.info(`${chalk.red(removedBoilerplates + ' boilerplates were removed')} from original list due to ${chalk.red('wrong format')}`);
    }

    return validBoilerplateArr;
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
