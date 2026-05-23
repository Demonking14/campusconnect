import mongoose , {Schema , Types , Document} from "mongoose";
export interface Service extends Document{
    title:string;
    description:string;
    serviceby :Types.ObjectId;
    price:number;
    isActive:boolean
}

const serviceSchema:Schema<Service> = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    serviceby:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    isActive:{
        type:Boolean,
        default : true
    }
}, {timestamps:true})

export const ServiceModel = mongoose.models.Service as mongoose.Model<Service> || mongoose.model<Service>("Service", serviceSchema);