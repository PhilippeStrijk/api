"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const common_1 = require("../../common");
const ticketController_1 = require("../controllers/ticketController");
const router = (0, express_1.Router)();
const validateNewTicketBody = [
    (0, express_validator_1.body)('title').not().isEmpty().withMessage('Title is required'),
    (0, express_validator_1.body)('description').not().isEmpty().withMessage('Description is required'),
    (0, express_validator_1.body)('price').isFloat({ gt: 0 }).withMessage('Price is required/must be greater than zero')
];
const validateUpdateTicketBody = [
    (0, express_validator_1.body)('title').isString().not().isEmpty().withMessage('Title is required'),
    (0, express_validator_1.body)('description').isString().not().isEmpty().withMessage('Description is required'),
    (0, express_validator_1.body)('price').isFloat({ gt: 0 }).not().isEmpty().withMessage('Price is required/must be greater than zero')
];
router.post('/tickets', common_1.requireAuth, validateNewTicketBody, common_1.validateRequest, ticketController_1.newTicket);
router.put('/tickets/:ticketId', common_1.requireAuth, validateUpdateTicketBody, common_1.validateRequest, ticketController_1.updateTicket);
router.get('/tickets/:ticketId', ticketController_1.showTicket);
router.get('/tickets', ticketController_1.showAllTickets);
exports.default = router;
