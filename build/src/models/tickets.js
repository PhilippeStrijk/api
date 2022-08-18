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
const mongoose_1 = __importDefault(require("mongoose"));
const common_1 = require("../../common");
const orders_1 = __importDefault(require("./orders"));
const ticketSchema = new mongoose_1.default.Schema({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    orderId: {
        type: String,
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        },
        versionKey: false
    },
    collection: 'tickets'
});
ticketSchema.set('timestamps', true);
ticketSchema.statics.build = (attrs) => {
    return new Ticket(attrs);
};
ticketSchema.methods.isReserved = () => __awaiter(void 0, void 0, void 0, function* () {
    const existingOrder = yield orders_1.default.findOne({
        ticket: this,
        status: {
            $in: [
                common_1.OrderStatus.Created,
                common_1.OrderStatus.AwaitingPayment,
                common_1.OrderStatus.Complete
            ]
        }
    });
    return !!existingOrder;
});
const Ticket = mongoose_1.default.model('tickets', ticketSchema);
exports.default = Ticket;
