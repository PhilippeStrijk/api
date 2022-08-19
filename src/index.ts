import * as dotenv from 'dotenv';
import { logger, } from '../common/logger/logger';
import { InternalServerError } from '../common';
import mongoose from 'mongoose';
import { app } from './app';

if (process.env.NODE_ENV === 'DEV') {
    dotenv.config({ path: __dirname + '/.env' });
}

const IP = "127.0.0.1";
const PORT = parseInt(process.env.PORT!) || 80;

const healthCheck = () => {
    if (!process.env.NODE_ENV) throw new Error('NODE_ENV is missing');
    if (!process.env.JWT_KEY) throw new Error('JWT_KEY is missing');
    if (!process.env.MONGODB_URL) throw new Error('MONGODB_URL is missing');
    if (!process.env.TWILIO_NUMBER) throw new Error('TWILIO_NUMBER is missing');
    if (!process.env.TWILIO_SID) throw new Error('TWILIO_SID is missing');
    if (!process.env.TWILIO_OTP_SID) throw new Error('TWILIO_OTP_SID is missing');
    if (!process.env.TWILIO_AUTH) throw new Error('TWILIO_AUTH is missing');

    logger.debug(`[HEALTH CHECK] Health check successful`);    
}

const databaseConfig = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL!);
        logger.debug(`[DATABASE CONFIG] Database config successful`);    
    } catch (err: Error | any) {
        logger.error(`[DATABASE CONFIG] ${err}`);
        throw new InternalServerError({message: err.message});
    }
};

const start = async () => {
    healthCheck();
    await databaseConfig();

    process.on('SIGTERM', async () => {
        logger.warn(`[SERVER INFO] Server closed gracefully`);
        app.listen().close(() => {
            process.exit(1);
        });
    });

    process.on('SIGINT', async () => {
        logger.warn(`[SERVER INFO] Server closed gracefully`);
        app.listen().close(() => {
            process.exit(1);
        });
    });

    app.listen(PORT, IP, () => {
        logger.debug(`[SERVER INFO] API running on ${IP}:${PORT}`);
    });
};

start();