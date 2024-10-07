import { IUser } from "@/interfaces";
import { Model, Schema, model, models } from "mongoose";


export const UserSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true 
    },
    email: {
        type: String,
        unique: true,
        required: true 
    },
    password: {
        type: String,
        required: true
    },
    photo: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'client'],
        default: 'client',
        message: '{VALUE} no es un role válido'
    },
    confirmed: {
        type: Boolean,
        default: true
    },
    token: {
        type: String,
        default: null
    }
},{
    timestamps: true
})


export const User:Model<IUser> = models.User || model('User', UserSchema)

export default User