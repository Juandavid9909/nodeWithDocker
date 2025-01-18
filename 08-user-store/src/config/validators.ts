import mongoose from "mongoose";

export class Validators {

    public static isMongoId(id: string) {
        return mongoose.isValidObjectId(id);
    }
}