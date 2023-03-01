import { BoilerplateHandlerContext } from '../strategies/BoilerplateHandler';
import { Boilerplate } from './Boilerplate';

type sourceOptions = 'default' | 'famous' | 'repository' | 'path';

type RuntimeSettings = {
  sourceType: sourceOptions;
  source: string;
  context: BoilerplateHandlerContext;
  boilerplatesArr: Boilerplate[];
};

export { RuntimeSettings };
