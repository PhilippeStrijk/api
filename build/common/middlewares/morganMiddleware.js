"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.morganMiddleware = void 0;
const morgan_1 = __importDefault(require("morgan"));
const logger_1 = require("../logger/logger");
const stream = {
    write: (message) => logger_1.logger.http(message)
};
const skip = () => {
    const env = process.env.NODE_ENV || 'DEV';
    return env !== 'DEV';
};
exports.morganMiddleware = (0, morgan_1.default)(":method :url :status :res[content-length] - :response-time ms", { stream, skip });
