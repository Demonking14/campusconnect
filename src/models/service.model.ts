import mongoose , {Schema , Types , Document} from "mongoose";
export interface IService{
    title:string;
    description:string;
    serviceby :Types.ObjectId;
    price:number;
    isActive:boolean
}

const serviceSchema= new Schema<IService>({
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
export type serviceDocument = mongoose.InferSchemaType<typeof serviceSchema>;
export const ServiceModel = mongoose.models.Service  || mongoose.model<IService>("Service", serviceSchema);