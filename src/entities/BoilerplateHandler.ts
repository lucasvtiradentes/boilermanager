import { BoilerplateHandlerStrategy } from '../types/BoilerplateStrategy';
import { BoilerplateInfo } from '../types/Boilerplate';
import { RuntimeSettings } from '../types/RuntimeSettings';

class BoilerplateHandlerContext {
  constructor(private strategy: BoilerplateHandlerStrategy) {
    this.strategy = strategy;
  }

  public setStrategy(strategy: BoilerplateHandlerStrategy) {
    this.strategy = strategy;
  }

  async list(source: string): Promise<BoilerplateInfo[]> {
    return this.strategy.list(source);
  }

  async choose(runTime: RuntimeSettings, name: string): Promise<boolean> {
    return this.strategy.choose(runTime, name);
  }
}

/* -------------------------------------------------------------------------- */

export { BoilerplateHandlerStrategy, BoilerplateHandlerContext };
