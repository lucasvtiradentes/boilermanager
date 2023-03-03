import { OptionValues } from 'commander';
import { BoilerplateHandler } from '../strategies/boilerplateHandler/BoilerplateHandler';
import { BoilerplateInfo } from './Boilerplate';

type sourceOptions = 'default' | 'repository' | 'path';

type RuntimeSettings = {
  sourceType: sourceOptions;
  source: string;
  boilerplateHandler: BoilerplateHandler;
  boilerplatesArr: BoilerplateInfo[];
  options: OptionValues;
};

export { RuntimeSettings };
