"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const routeError_1 = require("../errors/base/routeError");
const logger_1 = require("../logger/logger");
const errorHandler = (err, req, res, next) => {
    logger_1.logger.error(err.message);
    if (err instanceof routeError_1.RouteError)
        return res.status(err.status).send({
            success: false,
            errors: err.serializeErrors()
        });
    return res.status(400).send({
        success: false,
        errors: [{
                name: 'UnkownError',
                type: 'unkown_error',
                field: null,
                message: 'Something went wrong'
            }]
    });
};
exports.errorHandler = errorHandler;
