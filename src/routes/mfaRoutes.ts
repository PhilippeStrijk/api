import { Router } from "express";
import { body } from "express-validator";
import { validateSMS } from "../controllers/mfaControllers";
import { validateRequest } from '../../common';

const validateOTPBody = [
    body('userId').isString().notEmpty().withMessage('userId must be valid'),
    body('otpCode').notEmpty().isLength({ min: 6, max: 6 }).withMessage('OTP Code must be valid')
];

const router = Router();

router.post('/mfa/validateOTP', validateOTPBody, validateRequest, validateSMS);

export default router;