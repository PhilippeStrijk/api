import { Twilio } from 'twilio';
import { InternalServerError } from '../../common';

export const sendOTP = async (from: string, to: string, otpCode: number): Promise<string> => {
    const client = new Twilio(process.env.TWILIO_SID!.toString(), process.env.TWILIO_AUTH!.toString());
    if (!client) throw new InternalServerError({ message: 'Something unexpected happened when sending your OTP' });

    const result = await client.messages.create({
        from: from,
        to: to,
        validityPeriod: 60,
        messagingServiceSid: process.env.TWILIO_OTP_SID!,
        body: `Your verification code is ${otpCode} it's valid for 60 seconds`
    });

    if (result.status === 'failed') throw new InternalServerError({ message: 'Something unexpected happened when sending your OTP' });
    
    return result.sid;
};