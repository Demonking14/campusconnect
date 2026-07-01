import mongoose, { Schema, Types } from "mongoose";
export interface IUser {
    username: string,
    email: string,
    googleID: string,
    avatar?: string,
    activeServices: Types.ObjectId[];
    providedServices: Types.ObjectId[];
}
const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: [true, "Username is required"],
    },
    email: {
        type: String,
        required: true,
        unique: true,

    },
    googleID: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    activeServices: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service"
    }],
    providedServices: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service"
    }],
}, { timestamps: true });
export type UserDocument = mongoose.InferSchemaType<typeof userSchema>;
export const UserModel = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
// mongoose.models.User is checking whether our model already exist or not , if not then we are making one if aleady exist then we will just update that.