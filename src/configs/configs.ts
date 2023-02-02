import { join } from 'node:path';
import { readJson } from '../utils/read-json';

const isTsnode = process.argv[0].search('ts-node') > -1;
const packageJsonPath = join(__dirname, isTsnode ? '' : '..', '../../package.json');
const packageJsonObj = readJson(packageJsonPath) as any;

const APP_NAME = packageJsonObj.name;
const APP_DESCRIPTION = packageJsonObj.description;
const APP_VERSION = packageJsonObj.version;
const GITHUB_BOILERPLATES_REPOSITORY = 'lucasvtiradentes/ts-boilerplates';

export { APP_NAME, APP_DESCRIPTION, APP_VERSION, GITHUB_BOILERPLATES_REPOSITORY };
