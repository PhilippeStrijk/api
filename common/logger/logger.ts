import winston from 'winston';

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

const level = () => {
    const env = process.env.NODE_ENV || 'DEV'
    const isDevelopment = env === 'DEV'
    return isDevelopment ? 'debug' : 'warn'
}

const colors = {
    error: "red",
    warn: "yellow",
    info: "blue",
    http: "magenta",
    debug: "green",
};


winston.addColors(colors);

//log format
const format = winston.format.combine(
    winston.format.timestamp({ format: 'DD-MM-YYYY: HH:mm:ss' }),
    winston.format.colorize({ all: true }),
    winston.format.printf(
        (info: any) => `[${info.timestamp}] [${info.level}]: ${info.message}`
    )
);

const transports = [
    new winston.transports.Console(),
    new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error' //alles vanaf error en eronder
    }),
    new winston.transports.File({
        filename: 'logs/combined.log'
    })
];

export const logger = winston.createLogger({
    level: level(),
    levels,
    format,
    transports
});
