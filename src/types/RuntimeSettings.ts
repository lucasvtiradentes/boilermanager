import { OptionValues } from 'commander';
import { BoilerplateHandlerContext } from '../entities/BoilerplateHandler';
import { Boilerplate } from './Boilerplate';

type sourceOptions = 'default' | 'repository' | 'path';

type RuntimeSettings = {
  sourceType: sourceOptions;
  source: string;
  context: BoilerplateHandlerContext;
  boilerplatesArr: Boilerplate[];
  options: OptionValues;
};

export { RuntimeSettings };
