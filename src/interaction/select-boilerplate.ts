import inquirer from 'inquirer';
import { BoilerplateHandlerContext } from '../entities/BoilerplateHandler';
import { BoilerplateItem } from '../entities/BoilerplateItem';
import { RuntimeSettings } from '../entities/RuntimeSettings';

async function selectBoilerplate(runtime: RuntimeSettings) {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'boilerplate',
        message: 'Choose the desired boilerplate to start with: ',
        choices: runtime.boilerplatesArr.map((item) => item)
      }
    ])
    .then((answers) => {
      runtime.context.choose(runtime.source, answers['boilerplate']);
    });
}

export { selectBoilerplate };
