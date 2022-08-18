import mongoose from "mongoose";
import { OrderStatus } from "../../common";
import Order from "./orders";

interface ITicketAttrs {
    title: string;
    description: string;
    price: number;
    userId: string;
}

export interface ITicketDoc extends mongoose.Document {
    title: string;
    description: string;
    price: number;
    userId: string;
    orderId?: string;
    isReserved(): Promise<boolean>;
}

interface ITicketModel extends mongoose.Model<ITicketDoc> {
    build(attrs: ITicketAttrs): ITicketDoc;
}

const ticketSchema = new mongoose.Schema({
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
ticketSchema.statics.build = (attrs: ITicketAttrs) => {
    return new Ticket(attrs);
};

ticketSchema.methods.isReserved = async () => {
    const existingOrder = await Order.findOne({
        ticket: this as any,
        status: {
            $in: [
                OrderStatus.Created,
                OrderStatus.AwaitingPayment,
                OrderStatus.Complete
            ]
        }
    });

    return !!existingOrder;
}

const Ticket = mongoose.model<ITicketDoc, ITicketModel>('tickets', ticketSchema);

export default Ticket;