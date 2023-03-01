import chalk from 'chalk';

class Logger {
  error(msg: string) {
    console.log(chalk.red('error: ') + msg);
  }

  info(msg: string) {
    console.log(chalk.blue('info: ') + msg);
  }
}

const logger = new Logger();
export { logger };
