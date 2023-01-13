import inquirer from 'inquirer';

async function selectBoilerplate(boilerArr: string[]) {
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
    });
}

export { selectBoilerplate };
