import chalk from 'chalk';

class ColoredMessage {
  error(msg: string) {
    console.log(chalk.red('error: ') + msg);
  }

  info(msg: string) {
    console.log(chalk.blue('info : ') + msg);
  }
}

const coloredMessage = new ColoredMessage();
export { coloredMessage };
