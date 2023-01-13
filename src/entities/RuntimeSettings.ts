import { BoilerplateHandlerContext } from './BoilerplateHandler';
import { BoilerplateItem } from './BoilerplateItem';

type sourceOptions = 'default' | 'famous' | 'starred' | 'path';

type RuntimeSettings = {
  sourceType: sourceOptions;
  source: string;
  context: BoilerplateHandlerContext;
  boilerplatesArr: BoilerplateItem[];
};

export { RuntimeSettings };
