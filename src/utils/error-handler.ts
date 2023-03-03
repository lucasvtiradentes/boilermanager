import { logger } from './logger';

function errorHandler(message: string, skipExit?: boolean) {
  logger.error(message);
  if (!skipExit) {
    process.exit(1);
  }
}

export { errorHandler };
