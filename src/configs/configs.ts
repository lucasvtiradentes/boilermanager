import dotenv from 'dotenv';
dotenv.config();

const DESCRIPTION = process.env.npm_package_description ?? '-';
const VERSION = process.env.npm_package_version ?? '-';
const GITHUB_BOILERPLATES_REPOSITORY = 'ts-boilerplate-land/ts-boilerplates';

console.log(process.env.npm_package);
console.log('DESCRIPTION: ', DESCRIPTION);
console.log('VERSION: ', VERSION);

export { DESCRIPTION, VERSION, GITHUB_BOILERPLATES_REPOSITORY };
