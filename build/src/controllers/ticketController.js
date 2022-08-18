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
exports.updateTicket = exports.showAllTickets = exports.showTicket = exports.newTicket = void 0;
const common_1 = require("../../common");
const models_1 = require("../models");
const newTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, price } = req.body;
    console.log('here');
    const ticket = models_1.Ticket.build({
        title,
        description,
        price,
        userId: req.currentUser.id
    });
    yield ticket.save();
    res.status(201).send({
        success: true,
        result: ticket
    });
});
exports.newTicket = newTicket;
const showTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ticketId } = req.params;
    const ticket = yield models_1.Ticket.findById(ticketId);
    if (!ticket)
        throw new common_1.BadRequestError({ message: 'Ticket not found!' });
    res.status(200).send({
        success: true,
        result: ticket
    });
});
exports.showTicket = showTicket;
const showAllTickets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tickets = yield models_1.Ticket.find({});
    res.status(200).send({
        success: true,
        result: tickets
    });
});
exports.showAllTickets = showAllTickets;
const updateTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, price } = req.body;
    const { ticketId } = req.params;
    const ticket = yield models_1.Ticket.findById(ticketId);
    if (!ticket)
        throw new common_1.BadRequestError({ message: 'Ticket not found!' });
    if (ticket.userId !== req.currentUser.id)
        throw new common_1.ForbiddenError({ message: 'Unauthorized to perform this action' });
    if (ticket.orderId)
        throw new common_1.ConflictError({ message: 'Cannot edit a reserved ticket' });
    ticket.set({
        title: title,
        description: description,
        price: price
    });
    yield ticket.save();
    res.status(201).send({
        success: true,
        result: ticket
    });
});
exports.updateTicket = updateTicket;
