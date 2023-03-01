import { Boilerplate } from './Boilerplate';

export interface BoilerplateHandlerStrategy {
  list(source: string): Promise<Boilerplate[]>;
  choose(source: string, name: string): Promise<boolean>;
}
