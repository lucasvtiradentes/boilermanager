import inquirer from 'inquirer';

function starBoilerplates(boilerArr: string[]) {
  inquirer
    .prompt([
      {
        type: 'checkbox',
        name: 'starredBoilerplates',
        message: 'select all boilerplates you want to star: ',
        choices: boilerArr.map((item) => item)
      }
    ])
    .then((answers) => {
      console.log(answers);
    });
}

export { starBoilerplates };
