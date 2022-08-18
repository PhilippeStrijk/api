import morgan, { StreamOptions } from 'morgan';
import { logger } from '../logger/logger';

const stream: StreamOptions = {
    write: (message: any) => logger.http(message)
};

const skip = () => {
    const env = process.env.NODE_ENV || 'DEV';
    return env !== 'DEV';
};

export const morganMiddleware = morgan(
    ":method :url :status :res[content-length] - :response-time ms",
    { stream, skip }
);
