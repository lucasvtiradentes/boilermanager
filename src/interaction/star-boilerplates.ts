import inquirer from 'inquirer';
import { BoilerplateItem } from '../entities/BoilerplateItem';
import { RuntimeSettings } from '../entities/RuntimeSettings';

function starBoilerplates(runtime: RuntimeSettings) {
  inquirer
    .prompt([
      {
        type: 'checkbox',
        name: 'starredBoilerplates',
        message: 'select all boilerplates you want to star: ',
        choices: runtime.boilerplatesArr.map((item: BoilerplateItem) => item.name)
      }
    ])
    .then((answers) => {
      console.log(answers);
    });
}

export { starBoilerplates };
