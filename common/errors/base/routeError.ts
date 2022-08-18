import { ErrorNames, ErrorTypes } from "../../enums/errorEnums"

export abstract class RouteError extends Error {
    abstract errorName: ErrorNames;
    abstract status: number;
    abstract type: ErrorTypes;
    abstract field: any;
    abstract message: string;

    constructor() {
        super();
        Object.setPrototypeOf(this, RouteError.prototype);
    };

    abstract serializeErrors(): { name: ErrorNames, type: ErrorTypes, message: string, field: any }[];
}