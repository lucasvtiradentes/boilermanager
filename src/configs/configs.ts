import { join } from 'node:path';
import { readJson } from '../utils/read-json';

const isTsnode = process.argv[0].search('ts-node') > -1;
const NODE_ENV = isTsnode ? 'development' : 'production';

const packageJsonPath = join(__dirname, NODE_ENV === 'development' ? '' : '..', '../../package.json');
const PACKAGE_JSON = readJson(packageJsonPath) as any;

const APP_NAME = PACKAGE_JSON.name;
const APP_DESCRIPTION = PACKAGE_JSON.description;
const APP_VERSION = PACKAGE_JSON.version;

const GITHUB_BOILERPLATES_REPOSITORY = 'lucasvtiradentes/ts-boilerplates';
const BOILERPLATES_DEFAULT_INFO_FILE = 'boilerplates/boilerplates.json';

export { APP_NAME, APP_DESCRIPTION, APP_VERSION, GITHUB_BOILERPLATES_REPOSITORY, BOILERPLATES_DEFAULT_INFO_FILE, NODE_ENV, PACKAGE_JSON };
