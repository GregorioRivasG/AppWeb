import { Document, Schema, Types, model } from "mongoose";

interface IOrderProduct {
    productId: Types.ObjectId;
    quantity: number;
    price: number;
}

export interface IOrder extends Document {
    _id: Types.ObjectId;
    userID: Types.ObjectId;
    total: number;
    subtotal: number;
    status: string;
    createDate: Date;
    updateDate: Date;
    products: IOrderProduct[];
}

const orderProductSchema = new Schema<IOrderProduct>({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'product',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    }
}, { _id: false }); 

const orderSchema = new Schema<IOrder>({
    userID: {
        type: Schema.Types.ObjectId,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    subtotal: {
        type: Number,
        required: true
    },
    products: {
        type: [orderProductSchema],
        required: true,
        validate: [(array: string | any[]) => array.length > 0, 'debe contener al menos un producto']
    },
    status: {
        type: String,
        required: true,
        enum: ['pendiente', 'procesando', 'completado', 'cancelado'],
        default: 'pendiente'
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    updateDate: {
        type: Date
    }
});

export const Order = model<IOrder>('order', orderSchema, 'order');