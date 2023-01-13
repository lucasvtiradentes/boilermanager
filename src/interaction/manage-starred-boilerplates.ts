import inquirer from 'inquirer';
import { logger } from '../utils/logger';

function manageStarredBoilerplates() {
  const starredBoilerplates: string[] = [];
  if (starredBoilerplates.length === 0) {
    logger.error('there are no starred boilerplates to manage');
    process.exit(1);
  }

  inquirer
    .prompt([
      {
        type: 'checkbox',
        name: 'boilerplatesToRemove',
        message: 'select all boilerplates you want to remove from starred ones: ',
        choices: starredBoilerplates.map((item) => item)
      }
    ])
    .then((answers) => {
      console.log(answers);
    });
}

export { manageStarredBoilerplates };
