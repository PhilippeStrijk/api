import { Request, Response } from 'express';
import { BadRequestError, InternalServerError } from '../../common';
import { OTP, User } from '../models';
import jwt from 'jsonwebtoken';

export const validateSMS = async (req: Request, res: Response) => {
    const { userId, otpCode } = req.body;
    
    const otp = await OTP.findOne({ userId: userId, otp_code: otpCode });
    if (!otp) throw new BadRequestError({ message: 'the provided otp code was wrong' });
    
    const user = await User.findOne({ id: userId });
    if (!user) throw new InternalServerError({ message: 'Something went wrong whilst validating your otp code' });

    await otp.delete();

    const userJwt = jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.JWT_KEY!);

    req.session = {
        jwt: userJwt
    };

    return res.status(200).send({
        success: true,
        result: user
    })
};