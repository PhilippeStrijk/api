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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSMS = void 0;
const common_1 = require("../../common");
const models_1 = require("../models");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateSMS = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, otpCode } = req.body;
    const otp = yield models_1.OTP.findOne({ userId: userId, otp_code: otpCode });
    if (!otp)
        throw new common_1.BadRequestError({ message: 'the provided otp code was wrong' });
    const user = yield models_1.User.findOne({ id: userId });
    if (!user)
        throw new common_1.InternalServerError({ message: 'Something went wrong whilst validating your otp code' });
    yield otp.delete();
    const userJwt = jsonwebtoken_1.default.sign({
        id: user.id,
        email: user.email
    }, process.env.JWT_KEY);
    req.session = {
        jwt: userJwt
    };
    return res.status(200).send({
        success: true,
        result: user
    });
});
exports.validateSMS = validateSMS;
