import inquirer from 'inquirer'
import { Boilerplate } from '../types/Boilerplate.js'

function starBoilerplates(boilerArr: Boilerplate[]) {
  inquirer
    .prompt([
      {
        type: 'checkbox',
        name: 'starredBoilerplates',
        message: 'select all boilerplates you want to star: ',
        choices: boilerArr.map((item) => item.name),
      },
    ])
    .then((answers) => {
      console.log(answers)
    })
}

export { starBoilerplates }
