"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const common_1 = require("../../common");
const orderController_1 = require("../controllers/orderController");
const router = (0, express_1.Router)();
const validateNewOrderBody = [
    (0, express_validator_1.body)('ticketId').not().isEmpty().withMessage('ticketId is required'),
];
router.post('/orders', common_1.requireAuth, validateNewOrderBody, common_1.validateRequest, orderController_1.newOrder);
router.put('/orders/cancel/:orderId', common_1.requireAuth, orderController_1.cancelOrder);
router.get('/orders/:orderId', common_1.requireAuth, orderController_1.showOrder);
router.get('/orders', common_1.requireAuth, orderController_1.showAllOrders);
exports.default = router;
