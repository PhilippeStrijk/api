"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const mfaControllers_1 = require("../controllers/mfaControllers");
const common_1 = require("../../common");
const validateOTPBody = [
    (0, express_validator_1.body)('userId').isString().notEmpty().withMessage('userId must be valid'),
    (0, express_validator_1.body)('otpCode').notEmpty().isLength({ min: 6, max: 6 }).withMessage('OTP Code must be valid')
];
const router = (0, express_1.Router)();
router.post('/mfa/validateOTP', validateOTPBody, common_1.validateRequest, mfaControllers_1.validateSMS);
exports.default = router;
