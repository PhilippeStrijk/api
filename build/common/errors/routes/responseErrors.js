"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = exports.ConflictError = exports.RouteNotFoundError = exports.ForbiddenError = exports.UnauthorizedError = exports.RequestValidationError = exports.BadRequestError = void 0;
const routeError_1 = require("../base/routeError");
const index_1 = require("../../index");
class BadRequestError extends routeError_1.RouteError {
    constructor(data) {
        super();
        this.errorName = index_1.ErrorNames.BadRequestError;
        this.status = 400;
        this.message = data.message;
        this.type = data.type || index_1.ErrorTypes.BadRequest;
        this.field = data.field || null;
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
    ;
    serializeErrors() {
        return [{ name: this.errorName, type: this.type, field: this.field, message: this.message }];
    }
    ;
}
exports.BadRequestError = BadRequestError;
;
class RequestValidationError extends routeError_1.RouteError {
    constructor(errors) {
        super();
        this.errors = errors;
        this.errorName = index_1.ErrorNames.RequestValidationError;
        this.status = 400;
        this.type = index_1.ErrorTypes.RequestValidation;
        this.errors.map((e) => {
            this.message = e.msg;
            this.field = e.param;
        });
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
    ;
    serializeErrors() {
        return [{ name: this.errorName, type: this.type, field: this.field, message: this.message }];
    }
    ;
}
exports.RequestValidationError = RequestValidationError;
;
class UnauthorizedError extends routeError_1.RouteError {
    constructor(data) {
        super();
        this.errorName = index_1.ErrorNames.UnauthorizedError;
        this.status = 401;
        this.message = data.message;
        this.type = data.type || index_1.ErrorTypes.Unauthorized;
        this.field = data.field || null;
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
    ;
    serializeErrors() {
        return [{ name: this.errorName, type: this.type, field: this.field, message: this.message }];
    }
    ;
}
exports.UnauthorizedError = UnauthorizedError;
;
class ForbiddenError extends routeError_1.RouteError {
    constructor(data) {
        super();
        this.errorName = index_1.ErrorNames.ForbiddenError;
        this.status = 403;
        this.message = data.message;
        this.type = data.type || index_1.ErrorTypes.Forbidden;
        this.field = data.field || null;
        Object.setPrototypeOf(this, ForbiddenError.prototype);
    }
    ;
    serializeErrors() {
        return [{ name: this.errorName, type: this.type, field: this.field, message: this.message }];
    }
    ;
}
exports.ForbiddenError = ForbiddenError;
;
class RouteNotFoundError extends routeError_1.RouteError {
    constructor(data) {
        super();
        this.errorName = index_1.ErrorNames.RouteNotFoundError;
        this.status = 404;
        this.message = data.message;
        this.type = data.type || index_1.ErrorTypes.RouteNotFound;
        this.field = data.field || null;
        Object.setPrototypeOf(this, RouteNotFoundError.prototype);
    }
    ;
    serializeErrors() {
        return [{ name: this.errorName, type: this.type, field: this.field, message: this.message }];
    }
    ;
}
exports.RouteNotFoundError = RouteNotFoundError;
;
class ConflictError extends routeError_1.RouteError {
    constructor(data) {
        super();
        this.errorName = index_1.ErrorNames.ConflictError;
        this.status = 409;
        this.message = data.message;
        this.type = data.type || index_1.ErrorTypes.Conflict;
        this.field = data.field || null;
        Object.setPrototypeOf(this, ConflictError.prototype);
    }
    ;
    serializeErrors() {
        return [{ name: this.errorName, type: this.type, field: this.field, message: this.message }];
    }
    ;
}
exports.ConflictError = ConflictError;
;
class InternalServerError extends routeError_1.RouteError {
    constructor(data) {
        super();
        this.errorName = index_1.ErrorNames.InternalServerError;
        this.status = 409;
        this.message = data.message;
        this.type = data.type || index_1.ErrorTypes.InternalServer;
        this.field = data.field || null;
        Object.setPrototypeOf(this, InternalServerError.prototype);
    }
    ;
    serializeErrors() {
        return [{ name: this.errorName, type: this.type, field: this.field, message: this.message }];
    }
    ;
}
exports.InternalServerError = InternalServerError;
;
