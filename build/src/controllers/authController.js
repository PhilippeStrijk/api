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
exports.currentUser = exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const common_1 = require("../../common");
const generateOTP_1 = __importDefault(require("../helpers/generateOTP"));
const password_1 = __importDefault(require("../helpers/password"));
const models_1 = require("../models");
const otp_1 = __importDefault(require("../models/otp"));
const twilio_1 = require("../modules/twilio");
const EXPIRATION_TIME = 60;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name, mfa, phone } = req.body;
    const existingUser = yield models_1.User.findOne({ email: email });
    if (existingUser)
        throw new common_1.BadRequestError({ message: 'Email already in use' });
    const user = models_1.User.build({ email, password, name, mfa, phone });
    try {
        yield user.save();
    }
    catch (err) {
        common_1.logger.error(err);
        throw new common_1.InternalServerError({ message: err.message });
    }
    const userJwt = jsonwebtoken_1.default.sign({
        id: user.id,
        email: user.email
    }, process.env.JWT_KEY);
    req.session = {
        jwt: userJwt
    };
    return res.status(201).send({
        success: true,
        result: user
    });
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const existingUser = yield models_1.User.findOne({ email });
    if (!existingUser)
        throw new common_1.UnauthorizedError({ message: 'Invalid credentials' });
    const valid = password_1.default.compare(existingUser.password, password);
    if (!valid)
        throw new common_1.UnauthorizedError({ message: 'Invalid credentials' });
    if (existingUser.mfa) {
        const activeOtp = yield otp_1.default.findOne({ userId: existingUser.id });
        if (!activeOtp) {
            const otpCode = (0, generateOTP_1.default)();
            const expiration = new Date();
            expiration.setSeconds(expiration.getSeconds() + EXPIRATION_TIME);
            const result = yield (0, twilio_1.sendOTP)(process.env.TWILIO_NUMBER, existingUser.phone, otpCode);
            const otp = otp_1.default.build({
                id: existingUser.id,
                sid: result,
                otp_code: otpCode,
                expiresAt: expiration,
                phoneTo: existingUser.phone,
                phoneFrom: process.env.TWILIO_NUMBER
            });
            try {
                yield otp.save();
            }
            catch (err) {
                common_1.logger.error(err);
                throw new common_1.InternalServerError({ message: err.message });
            }
        }
        return res.status(200).send({
            success: true,
            result: {
                mfa: true
            }
        });
    }
    else {
        const userJwt = jsonwebtoken_1.default.sign({
            id: existingUser.id,
            email: existingUser.email
        }, process.env.JWT_KEY);
        req.session = {
            jwt: userJwt
        };
        return res.status(200).send({
            success: true,
            result: existingUser
        });
    }
});
exports.loginUser = loginUser;
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.session = null;
    return res.status(200).send({
        success: true
    });
});
exports.logoutUser = logoutUser;
const currentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(201).send({ currentUser: req.currentUser || null });
});
exports.currentUser = currentUser;
