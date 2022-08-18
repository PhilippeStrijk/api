import { Router } from "express";
import { body } from "express-validator";
import { validateRequest, requireAuth } from '../../common';
import { newTicket, showAllTickets, showTicket, updateTicket } from "../controllers/ticketController";

const router = Router();
const validateNewTicketBody = [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('description').not().isEmpty().withMessage('Description is required'),
    body('price').isFloat({gt: 0}).withMessage('Price is required/must be greater than zero')
];

const validateUpdateTicketBody = [
    body('title').isString().not().isEmpty().withMessage('Title is required'),
    body('description').isString().not().isEmpty().withMessage('Description is required'),
    body('price').isFloat({ gt: 0 }).not().isEmpty().withMessage('Price is required/must be greater than zero')
];


router.post('/tickets', requireAuth, validateNewTicketBody, validateRequest, newTicket);
router.put('/tickets/:ticketId', requireAuth, validateUpdateTicketBody, validateRequest, updateTicket);
router.get('/tickets/:ticketId', showTicket);
router.get('/tickets', showAllTickets);

export default router;