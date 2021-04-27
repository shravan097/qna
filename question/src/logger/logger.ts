import { Logger } from 'tslog';

let logger: Logger;
export function getLogger(): Logger {
	if (!logger) {
		logger = new Logger();
		logger.info('Initialized Logger');
	}
	return logger;

}