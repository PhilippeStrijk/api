"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const common_1 = require("../../common");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
const signupBody = [
    (0, express_validator_1.body)('email').isEmail().notEmpty().withMessage('Email is invalid'),
    (0, express_validator_1.body)('name').isString().notEmpty().withMessage('Name can\'t be empty'),
    (0, express_validator_1.body)('mfa').isBoolean().notEmpty().withMessage('You need to enable/disable mfa'),
    (0, express_validator_1.body)('phone').isString().notEmpty().withMessage('You need to enter a valid phone number'),
    (0, express_validator_1.body)('password').trim().isLength({ min: 4, max: 20 }).withMessage('Password must be between 4 - 20 characters')
];
const signinBody = [
    (0, express_validator_1.body)('email').isEmail().notEmpty().withMessage('Email is invalid'),
    (0, express_validator_1.body)('password').trim().notEmpty().withMessage('Password must be between 4 - 20 characters')
];
router.post('/auth/signup', signupBody, common_1.validateRequest, authController_1.registerUser);
router.post('/auth/signin', signinBody, common_1.validateRequest, authController_1.loginUser);
router.post('/auth/signout', authController_1.logoutUser);
router.get('/auth/currentUser', common_1.currentUser, authController_1.currentUser);
exports.default = router;
