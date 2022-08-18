"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const logger_1 = require("../common/logger/logger");
const common_1 = require("../common");
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = require("./app");
if (process.env.NODE_ENV === 'DEV') {
    dotenv.config({ path: __dirname + '/.env' });
}
const PORT = 6000;
const IP = "127.0.0.1";
const healthCheck = () => {
    if (!process.env.NODE_ENV)
        throw new Error('NODE_ENV is missing');
    if (!process.env.JWT_KEY)
        throw new Error('JWT_KEY is missing');
    if (!process.env.MONGODB_URL)
        throw new Error('MONGODB_URL is missing');
    if (!process.env.TWILIO_NUMBER)
        throw new Error('TWILIO_NUMBER is missing');
    if (!process.env.TWILIO_SID)
        throw new Error('TWILIO_SID is missing');
    if (!process.env.TWILIO_OTP_SID)
        throw new Error('TWILIO_OTP_SID is missing');
    if (!process.env.TWILIO_AUTH)
        throw new Error('TWILIO_AUTH is missing');
    if (!fs_1.default.existsSync('../logs'))
        fs_1.default.mkdirSync('../logs');
    logger_1.logger.debug(`[HEALTH CHECK] Health check successful`);
};
const databaseConfig = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(process.env.MONGODB_URL);
        logger_1.logger.debug(`[DATABASE CONFIG] Database config successful`);
    }
    catch (err) {
        logger_1.logger.error(`[DATABASE CONFIG] ${err}`);
        throw new common_1.InternalServerError({ message: err.message });
    }
});
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    healthCheck();
    yield databaseConfig();
    process.on('SIGTERM', () => __awaiter(void 0, void 0, void 0, function* () {
        logger_1.logger.warn(`[SERVER INFO] Server closed gracefully`);
        app_1.app.listen().close(() => {
            process.exit(1);
        });
    }));
    process.on('SIGINT', () => __awaiter(void 0, void 0, void 0, function* () {
        logger_1.logger.warn(`[SERVER INFO] Server closed gracefully`);
        app_1.app.listen().close(() => {
            process.exit(1);
        });
    }));
    app_1.app.listen(PORT, IP, () => {
        logger_1.logger.debug(`[SERVER INFO] API running on ${IP}:${PORT}`);
    });
});
start();
