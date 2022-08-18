import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { BadRequestError, InternalServerError, logger, UnauthorizedError } from '../../common';
import generateSmsOTP from '../helpers/generateOTP';
import PasswordHashAndCompare from '../helpers/password';
import { User } from '../models';
import OTP from '../models/otp';
import { sendOTP } from '../modules/twilio';

const EXPIRATION_TIME = 60;

export const registerUser = async (req: Request, res: Response) => {
    const { email, password, name, mfa, phone } = req.body;

    const existingUser = await User.findOne({ email: email })
    if (existingUser) throw new BadRequestError({ message: 'Email already in use' });

    const user = User.build({ email, password, name, mfa, phone });

    try {
        await user.save();
    } catch (err: any) {
        logger.error(err);
        throw new InternalServerError({ message: err.message });
    }

    const userJwt = jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.JWT_KEY!);

    req.session = {
        jwt: userJwt
    };

    return res.status(201).send({
        success: true,
        result: user
    }); 
    
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (!existingUser) throw new UnauthorizedError({ message: 'Invalid credentials' });

    const valid = PasswordHashAndCompare.compare(existingUser.password, password);
    if (!valid) throw new UnauthorizedError({ message: 'Invalid credentials' });

    if (existingUser.mfa) {

        const activeOtp = await OTP.findOne({ userId: existingUser.id });
        if (!activeOtp) { 
            const otpCode: number = generateSmsOTP();
            const expiration: Date = new Date();
            expiration.setSeconds(expiration.getSeconds() + EXPIRATION_TIME);
            const result = await sendOTP(process.env.TWILIO_NUMBER!, existingUser.phone, otpCode);
    
            const otp = OTP.build({
                id: existingUser.id,
                sid: result,
                otp_code: otpCode,
                expiresAt: expiration,
                phoneTo: existingUser.phone,
                phoneFrom: process.env.TWILIO_NUMBER!
            });
    
            try {
                await otp.save();
            } catch (err: any) {
                logger.error(err);
                throw new InternalServerError({ message: err.message });
            }
        }

        return res.status(200).send({
            success: true,
            result: {
                mfa: true
            }
        });

    } else {
        const userJwt = jwt.sign({
            id: existingUser.id,
            email: existingUser.email
        }, process.env.JWT_KEY!)
        
        req.session = {
            jwt: userJwt
        };
        
        return res.status(200).send({
            success: true,
            result: existingUser
        })
    }
};

export const logoutUser = async (req: Request, res: Response) => {
    req.session = null;
    return res.status(200).send({
        success: true
    });
};

export const currentUser = async (req: Request, res: Response) => {
    res.status(201).send({currentUser: req.currentUser || null});
};