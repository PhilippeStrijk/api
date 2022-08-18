"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const common_1 = require("../../common");
;
const orderSchema = new mongoose_1.default.Schema({
    userId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(common_1.OrderStatus),
        default: common_1.OrderStatus.Created
    },
    expiresAt: {
        type: mongoose_1.default.Schema.Types.Date
    },
    ticketId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'tickets'
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        },
        versionKey: false,
    },
    collection: 'orders'
});
orderSchema.statics.build = (attrs) => {
    return new Order({
        userId: attrs.userId,
        status: attrs.status,
        expiresAt: attrs.expiresAt,
        ticketId: attrs.ticketId
    });
};
const Order = mongoose_1.default.model('orders', orderSchema);
exports.default = Order;
