export enum ErrorNames {
    BadRequestError = "BadRequestError",
    RequestValidationError = "RequestValidationError",
    UnauthorizedError = "UnauthorizedError",
    ForbiddenError = "ForbiddenError",
    RouteNotFoundError = "RouteNotFoundError",
    ConflictError = "ConflictError",
    InternalServerError = "InternalServerError",
};

export enum ErrorTypes {
    BadRequest = "bad_request",
    RequestValidation = "request_validation",
    Unauthorized = "unauthorized",
    Forbidden = "forbidden",
    RouteNotFound = "route_not_found",
    Conflict = "conflict",
    InternalServer = "internal_server",
    DBConnection = "db_connection_error",
    MFANotEnabled = "mfa_not_enabled",
    InvalidCredentials = "invalid_credentials",
    InvalidPassword = "invalid_password",
    InvalidEmail = "invalid_email",
    InvalidOTP = "otp_code_invalid",
    expiredOTP = "otp_code_expired",
    sentOTP = "otp_code_already_sent"
}