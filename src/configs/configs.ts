import { join } from 'node:path';
import { readJson } from '../utils/read-json';

const packageJsonObj = readJson(join(__dirname, '../../package.json')) as any;
const APP_NAME = packageJsonObj.name;
const APP_DESCRIPTION = packageJsonObj.description;
const APP_VERSION = packageJsonObj.version;
const GITHUB_BOILERPLATES_REPOSITORY = 'ts-boilerplate-land/ts-boilerplates';

export { APP_NAME, APP_DESCRIPTION, APP_VERSION, GITHUB_BOILERPLATES_REPOSITORY };
