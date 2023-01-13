import inquirer from 'inquirer';
import { BoilerplatesHandler } from '../entities/BoilerplatesHandler';

async function selectBoilerplate(boilerArr: string[], boilerHandler: BoilerplatesHandler) {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'boilerplate',
        message: 'Choose the desired boilerplate to start with: ',
        choices: boilerArr.map((item) => item)
      }
    ])
    .then((answers) => {
      console.log(answers);
      boilerHandler.select(answers['boilerplate']);
    });
}

export { selectBoilerplate };
