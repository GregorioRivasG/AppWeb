import { Document, model, Schema, Types } from "mongoose";

export interface IRole extends Document {
    _id: Types.ObjectId;
    name: string;
    fype: string;
    status: boolean;
}

const roleSchema = new Schema<IRole>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    fype: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
});

export const Role = model<IRole>('Role', roleSchema, 'role');
