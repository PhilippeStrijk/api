import mongoose from 'mongoose';
import { OrderStatus } from '../../common';
import { ITicketDoc } from './tickets';
import { IUserDoc } from './user';
    
interface IOrderAttrs {
    userId: string;
    status: OrderStatus;
    expiresAt: Date;
    ticketId: ITicketDoc;
}

export interface IOrderDoc extends mongoose.Document {
    userId: string;
    status: OrderStatus;
    expiresAt: Date;
    ticketId: ITicketDoc;
};

interface IOrderModel extends mongoose.Model<IOrderDoc> {
    build(attrs: IOrderAttrs): IOrderDoc;
}

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(OrderStatus),
        default: OrderStatus.Created
    },
    expiresAt: {
        type: mongoose.Schema.Types.Date
    },
    ticketId: {
        type: mongoose.Schema.Types.ObjectId,
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

orderSchema.statics.build = (attrs: IOrderAttrs) => {
    return new Order({
        userId: attrs.userId,
        status: attrs.status,
        expiresAt: attrs.expiresAt,
        ticketId: attrs.ticketId
    })
};

const Order = mongoose.model<IOrderDoc, IOrderModel>('orders', orderSchema);

export default Order;