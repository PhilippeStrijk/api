import { ValidationError } from "express-validator";
import { RouteError } from "../base/routeError";
import { ErrorNames, ErrorTypes } from "../../index";

export class BadRequestError extends RouteError {
    readonly errorName = ErrorNames.BadRequestError;
    readonly status: number = 400;
    message: string;
    type: ErrorTypes;
    field: any

    constructor(data: { message: string, type?: ErrorTypes, field?: any }) {
        super();
        this.message = data.message;
        this.type = data.type || ErrorTypes.BadRequest;
        this.field = data.field || null;
        Object.setPrototypeOf(this, BadRequestError.prototype);
    };

    serializeErrors() { 
        return [{name: this.errorName, type: this.type, field: this.field, message: this.message}]
    };
};

export class RequestValidationError extends RouteError {
    readonly errorName = ErrorNames.RequestValidationError;
    readonly status: number = 400;
    message!: string;
    type: ErrorTypes = ErrorTypes.RequestValidation;
    field: any;

    constructor(public errors: ValidationError[]) {
        super();
        this.errors.map((e) => {
            this.message = e.msg;
            this.field = e.param;
        });
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    };

    serializeErrors() { 
        return [{name: this.errorName, type: this.type, field: this.field, message: this.message}]
    };
};

export class UnauthorizedError extends RouteError {
    readonly errorName = ErrorNames.UnauthorizedError;
    readonly status: number = 401;
    message: string;
    type: ErrorTypes;
    field: any;

    constructor(data: { message: string, type?: ErrorTypes, field?: any }) {
        super();
        this.message = data.message;
        this.type = data.type || ErrorTypes.Unauthorized;
        this.field = data.field || null;
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    };

    serializeErrors() { 
        return [{name: this.errorName, type: this.type, field: this.field, message: this.message}]
    };
};

export class ForbiddenError extends RouteError {
    readonly errorName = ErrorNames.ForbiddenError;
    readonly status: number = 403;
    message: string;
    type: ErrorTypes;
    field: any;

    constructor(data: { message: string, type?: ErrorTypes, field?: any }) {
        super();
        this.message = data.message;
        this.type = data.type || ErrorTypes.Forbidden;
        this.field = data.field || null;
        Object.setPrototypeOf(this, ForbiddenError.prototype);
    };

    serializeErrors() { 
        return [{name: this.errorName, type: this.type, field: this.field, message: this.message}]
    };
};

export class RouteNotFoundError extends RouteError {
    readonly errorName = ErrorNames.RouteNotFoundError;
    readonly status: number = 404;
    message: string;
    type: ErrorTypes;
    field: any;

    constructor(data: { message: string, type?: ErrorTypes, field?: any }) {
        super();
        this.message = data.message;
        this.type = data.type || ErrorTypes.RouteNotFound;
        this.field = data.field || null;
        Object.setPrototypeOf(this, RouteNotFoundError.prototype);
    };

    serializeErrors() { 
        return [{name: this.errorName, type: this.type, field: this.field, message: this.message}]
    };
};

export class ConflictError extends RouteError {
    readonly errorName = ErrorNames.ConflictError;
    readonly status: number = 409;
    message: string;
    type: ErrorTypes;
    field: any;

    constructor(data: { message: string, type?: ErrorTypes, field?: any }) {
        super();
        this.message = data.message;
        this.type = data.type || ErrorTypes.Conflict;
        this.field = data.field || null;
        Object.setPrototypeOf(this, ConflictError.prototype);
    };

    serializeErrors() { 
        return [{name: this.errorName, type: this.type, field: this.field, message: this.message}]
    };
};

export class InternalServerError extends RouteError {
    readonly errorName = ErrorNames.InternalServerError;
    readonly status: number = 409;
    message: string;
    type: ErrorTypes;
    field: any;

    constructor(data: { message: string, type?: ErrorTypes, field?: any }) {
        super();
        this.message = data.message;
        this.type = data.type || ErrorTypes.InternalServer;
        this.field = data.field || null;
        Object.setPrototypeOf(this, InternalServerError.prototype);
    };

    serializeErrors() { 
        return [{name: this.errorName, type: this.type, field: this.field, message: this.message}]
    };
};


