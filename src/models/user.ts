import mongoose from "mongoose";
import {Document} from "mongoose";

interface IUser extends Document {
    name: string;
    email: string;
    phone: string;
    passport: string;
    birthday: string;

}

const {Schema, model} = mongoose;

let userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
            match: /^[a-zA-Zа-яА-ЯіїІЇєЄ]*$/
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^[\w\-\.]+[\w]+@([\w-]+\.)+[a-zA-Z]*$/
        },
        phone: {
            type: String,
            required: true,
            unique: true,
            match :/^\+[\d]{1,1}\([\d]{4,4}\) [\d]{3}-[\d]{2}-[\d]{2}$/
        },
        passport: {
            type: String,
            required: true,
            match:/^([A-Z]{2}[\d]{6})|([\d]{9})$/
        },
        birthday: {
            required: true,
            type: String,
            match:/^([0-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-((19[0-9]{2})|(20([0-1][0-9]|2[0-2])))$/
        },
    }
);
//https://prnt.sc/8cB6SozgKC8-
interface ErrorStatus extends Error {
    status?: number
    code: number
}

let handleErrors = (error: ErrorStatus, next: (error?: ErrorStatus) => void): void => {
    if (error && error instanceof Error) {
        error.status = 400;
        let {name, code} = error;
        if (code === 11000 || name === 'MongoServerError') {
            error.status = 409;
        }
        return next(error);
    }
    next();
};
userSchema.post("findOneAndUpdate", handleErrors);
userSchema.post("updateOne", handleErrors);
userSchema.post("save", handleErrors);
const User = model('user', userSchema);

export default User;