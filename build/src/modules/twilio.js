"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOTP = void 0;
const twilio_1 = require("twilio");
const common_1 = require("../../common");
const sendOTP = (from, to, otpCode) => __awaiter(void 0, void 0, void 0, function* () {
    const client = new twilio_1.Twilio(process.env.TWILIO_SID.toString(), process.env.TWILIO_AUTH.toString());
    if (!client)
        throw new common_1.InternalServerError({ message: 'Something unexpected happened when sending your OTP' });
    const result = yield client.messages.create({
        from: from,
        to: to,
        validityPeriod: 60,
        messagingServiceSid: process.env.TWILIO_OTP_SID,
        body: `Your verification code is ${otpCode} it's valid for 60 seconds`
    });
    if (result.status === 'failed')
        throw new common_1.InternalServerError({ message: 'Something unexpected happened when sending your OTP' });
    return result.sid;
});
exports.sendOTP = sendOTP;
