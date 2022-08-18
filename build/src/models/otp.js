"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
;
const otpSchema = new mongoose_1.default.Schema({
    userId: {
        type: String,
        unique: true,
        required: true
    },
    sid: {
        type: String,
        unique: true,
        required: true
    },
    otp_code: {
        type: Number,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    },
    phoneTo: {
        type: String,
        required: true
    },
    phoneFrom: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
        },
        versionKey: false,
    },
    collection: 'otp_codes'
});
otpSchema.set('timestamps', true);
otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 });
otpSchema.statics.build = (attrs) => {
    return new OTP({
        userId: attrs.id,
        sid: attrs.sid,
        otp_code: attrs.otp_code,
        expiresAt: attrs.expiresAt,
        phoneTo: attrs.phoneTo,
        phoneFrom: attrs.phoneFrom
    });
};
const OTP = mongoose_1.default.model('otp_codes', otpSchema);
exports.default = OTP;
