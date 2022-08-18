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
exports.showAllOrders = exports.showOrder = exports.cancelOrder = exports.newOrder = void 0;
const common_1 = require("../../common");
const models_1 = require("../models");
const EXPIRATION_TIME = 300;
const newOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ticketId } = req.body;
    const ticket = yield models_1.Ticket.findById(ticketId);
    if (!ticket)
        throw new common_1.BadRequestError({ message: 'Ticket not found' });
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_TIME);
    const order = models_1.Order.build({
        userId: req.currentUser.id,
        status: common_1.OrderStatus.Created,
        expiresAt: expiration,
        ticketId: ticketId
    });
    yield order.save();
    return res.status(201).send({
        success: true,
        result: order
    });
});
exports.newOrder = newOrder;
const cancelOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.params;
    const order = yield models_1.Order.findById(orderId).populate('ticketId');
    if (!order)
        throw new common_1.BadRequestError({ message: 'Order not found' });
    if (order.status === common_1.OrderStatus.Cancelled)
        throw new common_1.BadRequestError({ message: 'Order already cancelled' });
    if (order.userId !== req.currentUser.id)
        throw new common_1.ForbiddenError({ message: 'You are not authorized to perform this action' });
    order.status = common_1.OrderStatus.Cancelled;
    yield order.save();
    return res.status(201).send({ success: true });
});
exports.cancelOrder = cancelOrder;
const showOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.params;
    const order = yield models_1.Order.findById(orderId).populate('ticketId');
    if (!order)
        throw new common_1.BadRequestError({ message: 'Order not found' });
    if (order.userId !== req.currentUser.id)
        throw new common_1.ForbiddenError({ message: 'You are not authorized to perform this action' });
    return res.status(200).send({
        success: true,
        result: order
    });
});
exports.showOrder = showOrder;
const showAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield models_1.Order.find({ userId: req.currentUser.id }).populate('ticketId');
    return res.status(200).send({
        success: true,
        result: orders
    });
});
exports.showAllOrders = showAllOrders;
