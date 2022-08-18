import { Request, Response } from 'express';
import { BadRequestError, ConflictError, ForbiddenError } from '../../common';
import { Ticket } from '../models';


export const newTicket = async (req: Request, res: Response) => {
    const { title, description, price } = req.body;
    console.log('here');
    const ticket = Ticket.build({
        title,
        description,
        price,
        userId: req.currentUser!.id
    });

    await ticket.save();
    res.status(201).send({
        success: true,
        result: ticket
    })
};

export const showTicket = async (req: Request, res: Response) => {
    const { ticketId } = req.params;

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) throw new BadRequestError({ message: 'Ticket not found!' });
    res.status(200).send({
        success: true,
        result: ticket
    });
    
};

export const showAllTickets = async (req: Request, res: Response) => {
    const tickets = await Ticket.find({});

    res.status(200).send({
        success: true,
        result: tickets
    })
};

export const updateTicket = async (req: Request, res: Response) => {
    const { title, description, price } = req.body;
    const { ticketId } = req.params;

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) throw new BadRequestError({ message: 'Ticket not found!' });

    if (ticket.userId !== req.currentUser!.id)
        throw new ForbiddenError({ message: 'Unauthorized to perform this action' });

    if (ticket.orderId) throw new ConflictError({ message: 'Cannot edit a reserved ticket' });

    ticket.set({
        title: title,
        description: description,
        price: price
    });

    await ticket.save();

    res.status(201).send({
        success: true,
        result: ticket
    });
};
