"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoutes = exports.ticketRoutes = exports.mfaRoutes = exports.authRoutes = void 0;
var authRoutes_1 = require("./authRoutes");
Object.defineProperty(exports, "authRoutes", { enumerable: true, get: function () { return __importDefault(authRoutes_1).default; } });
var mfaRoutes_1 = require("./mfaRoutes");
Object.defineProperty(exports, "mfaRoutes", { enumerable: true, get: function () { return __importDefault(mfaRoutes_1).default; } });
var ticketRoutes_1 = require("./ticketRoutes");
Object.defineProperty(exports, "ticketRoutes", { enumerable: true, get: function () { return __importDefault(ticketRoutes_1).default; } });
var orderRoutes_1 = require("./orderRoutes");
Object.defineProperty(exports, "orderRoutes", { enumerable: true, get: function () { return __importDefault(orderRoutes_1).default; } });
