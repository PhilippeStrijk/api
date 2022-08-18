import { Router } from "express";
import { body } from "express-validator";
import { validateRequest, requireAuth } from '../../common';
import { cancelOrder, newOrder, showAllOrders, showOrder } from "../controllers/orderController";

const router = Router();
const validateNewOrderBody = [
    body('ticketId').not().isEmpty().withMessage('ticketId is required'),
];

router.post('/orders', requireAuth, validateNewOrderBody, validateRequest, newOrder);
router.put('/orders/cancel/:orderId', requireAuth, cancelOrder);
router.get('/orders/:orderId', requireAuth, showOrder);
router.get('/orders', requireAuth, showAllOrders);

export default router;