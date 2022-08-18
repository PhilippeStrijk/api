import { Router } from "express";
import { body } from "express-validator";
import { validateRequest, currentUser as currentUserMiddleware } from "../../common";
import { currentUser, logoutUser, registerUser, loginUser } from "../controllers/authController";


const router = Router();

const signupBody = [
    body('email').isEmail().notEmpty().withMessage('Email is invalid'),
    body('name').isString().notEmpty().withMessage('Name can\'t be empty'),
    body('mfa').isBoolean().notEmpty().withMessage('You need to enable/disable mfa'),
    body('phone').isString().notEmpty().withMessage('You need to enter a valid phone number'),
    body('password').trim().isLength({ min: 4, max: 20 }).withMessage('Password must be between 4 - 20 characters')
];

const signinBody = [
    body('email').isEmail().notEmpty().withMessage('Email is invalid'),
    body('password').trim().notEmpty().withMessage('Password must be between 4 - 20 characters')
];


router.post('/auth/signup', signupBody, validateRequest, registerUser);
router.post('/auth/signin', signinBody, validateRequest, loginUser);
router.post('/auth/signout', logoutUser)
router.get('/auth/currentUser', currentUserMiddleware, currentUser);

export default router;