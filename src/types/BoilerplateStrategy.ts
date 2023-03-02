import { Boilerplate } from './Boilerplate';
import { RuntimeSettings } from './RuntimeSettings';

export interface BoilerplateHandlerStrategy {
  list(source: string): Promise<Boilerplate[]>;
  choose(runTime: RuntimeSettings, name: string): Promise<boolean>;
}
