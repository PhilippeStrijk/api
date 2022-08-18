"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const responseErrors_1 = require("../errors/routes/responseErrors");
const requireAuth = (req, res, next) => {
    if (!req.currentUser)
        throw new responseErrors_1.UnauthorizedError({ message: 'You need to be authenticated to perform this action' });
    next();
};
exports.requireAuth = requireAuth;
