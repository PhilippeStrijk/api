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
const crypto_1 = require("crypto");
const util_1 = require("util");
const scryptAsync = (0, util_1.promisify)(crypto_1.scrypt);
class PasswordHashAndCompare {
    static toHash(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = (0, crypto_1.randomBytes)(8).toString('hex');
            const buffer = (yield scryptAsync(password, salt, 64));
            return `${buffer.toString('hex')}.${salt}`;
        });
    }
    ;
    static compare(hashedPassword, unhashedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const [hash, salt] = hashedPassword.split('.');
            const buffer = (yield scryptAsync(unhashedPassword, salt, 64));
            return buffer.toString('hex') === hash;
        });
    }
    ;
}
exports.default = PasswordHashAndCompare;
;
