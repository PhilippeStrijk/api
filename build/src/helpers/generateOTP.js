"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generateSmsOTP = () => {
    return Math.floor(Math.random() * 899999 + 100000);
};
exports.default = generateSmsOTP;
