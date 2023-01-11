import inquirer from 'inquirer'
import { Boilerplate } from '../types/Boilerplate.js'

function selectBoilerplate(boilerArr: Boilerplate[]) {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'boilerplate',
        message: 'Choose the desired boilerplate to start with: ',
        choices: boilerArr.map((item) => item.name),
      },
    ])
    .then((answers) => {
      console.log(answers)
    })
}

export { selectBoilerplate }
