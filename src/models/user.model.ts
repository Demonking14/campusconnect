import mongoose, {Schema , Document , Types} from "mongoose";
export interface User extends Document{
    username:string,
    email:string,
    googleID:string,
    avatar:string,
    activeServices : Types.ObjectId[];
    providedServices:Types.ObjectId[];
}
const userSchema :Schema<User> = new Schema({
    username:{
        type:String,
        required:[true, "Username is required"],
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:[/^[a-zA-Z0-9._%+-]+@vitbhopal\.ac\.in$/, "Enter valid Email"]
    },
    googleID : {
        type:String,
        required:true
    },
    avatar:{
        type:String,
    },
    activeServices:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Service"
    }],
    providedServices:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Service"
    }],
}, {timestamps:true});

export const UserModel = mongoose.models.User as mongoose.Model<User> || mongoose.model<User>("User", userSchema);