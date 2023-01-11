import inquirer from 'inquirer'
import { Boilerplate } from '../types/Boilerplate.js'
import { coloredMessage } from '../utils/colored-message.js'

function manageStarredBoilerplates() {
  const starredBoilerplates: Boilerplate[] = []
  if (starredBoilerplates.length === 0) {
    coloredMessage.error('there are no starred boilerplates to manage')
    process.exit(1)
  }

  inquirer
    .prompt([
      {
        type: 'checkbox',
        name: 'boilerplatesToRemove',
        message: 'select all boilerplates you want to remove from starred ones: ',
        choices: starredBoilerplates.map((item) => item.name),
      },
    ])
    .then((answers) => {
      console.log(answers)
    })
}

export { manageStarredBoilerplates }
