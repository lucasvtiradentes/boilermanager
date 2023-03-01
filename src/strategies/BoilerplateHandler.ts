import { BoilerplateHandlerStrategy } from '../types/BoilerplateStrategy';
import { Boilerplate } from '../types/Boilerplate';

class BoilerplateHandlerContext {
  constructor(private strategy: BoilerplateHandlerStrategy) {
    this.strategy = strategy;
  }

  public setStrategy(strategy: BoilerplateHandlerStrategy) {
    this.strategy = strategy;
  }

  async list(source: string): Promise<Boilerplate[]> {
    return this.strategy.list(source);
  }

  async choose(source: string, name: string): Promise<boolean> {
    return this.strategy.choose(source, name);
  }
}

/* -------------------------------------------------------------------------- */

export { BoilerplateHandlerStrategy, BoilerplateHandlerContext };
