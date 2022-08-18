import { Request, Response } from 'express';
import { BadRequestError, ConflictError, ForbiddenError, OrderStatus } from '../../common';
import { Ticket, Order } from '../models';
const EXPIRATION_TIME = 300;

export const newOrder = async (req: Request, res: Response) => {
    const { ticketId } = req.body;

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) throw new BadRequestError({ message: 'Ticket not found' });

    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_TIME);

    const order = Order.build({
        userId: req.currentUser!.id,
        status: OrderStatus.Created,
        expiresAt: expiration,
        ticketId: ticketId
    });

    await order.save();
    
    return res.status(201).send({
        success: true,
        result: order
    });

};

export const cancelOrder = async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const order = await Order.findById(orderId).populate('ticketId');
    if (!order) throw new BadRequestError({ message: 'Order not found' });

    if (order.status === OrderStatus.Cancelled)
        throw new BadRequestError({ message: 'Order already cancelled' });
    
    if (order.userId !== req.currentUser!.id)
        throw new ForbiddenError({ message: 'You are not authorized to perform this action' });
    
    
    order.status = OrderStatus.Cancelled;
    await order.save();

    return res.status(201).send({success: true});
};

export const showOrder = async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const order = await Order.findById(orderId).populate('ticketId');
    if (!order) throw new BadRequestError({ message: 'Order not found' });

    if (order.userId !== req.currentUser!.id)
        throw new ForbiddenError({ message: 'You are not authorized to perform this action' });
    
    return res.status(200).send({
        success: true,
        result: order
    })
};

export const showAllOrders = async (req: Request, res: Response) => {
    const orders = await Order.find({ userId: req.currentUser!.id }).populate('ticketId');

    return res.status(200).send({
        success: true,
        result: orders
    });
};