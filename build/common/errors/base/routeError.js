"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteError = void 0;
class RouteError extends Error {
    constructor() {
        super();
        Object.setPrototypeOf(this, RouteError.prototype);
    }
    ;
}
exports.RouteError = RouteError;
