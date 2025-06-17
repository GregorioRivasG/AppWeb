import { Document, model, Schema, Types } from "mongoose";

export interface IProduct extends Document {
    _id: Types.ObjectId;
    name: string;
    descri: string;
    qty: number;
    status: boolean;
    price: number;
    createDate: Date;
    deleteDate?: Date;
}

const productSchema = new Schema<IProduct>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    descri: {
        type: String,
        required: false
    },
    qty: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: Boolean,
        default: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    deleteDate: {
        type: Date,
        default: null
    }
});

export const Product = model<IProduct>('Product', productSchema, 'product');
