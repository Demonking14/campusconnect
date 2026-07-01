import mongoose  , {Schema , Types} from "mongoose";

export interface IMSG{
    sender:Types.ObjectId;
    sendername:string;
    avatar:string;
    msg:string
    timestamp:Date;
}
export interface IChat{
    roomId:string;
    serviceId:Types.ObjectId;
    participants:Types.ObjectId[];
    msg:IMSG[];
    createdAt:Date;
}

const messageSchema = new Schema<IMSG>({
    sender:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    sendername:{
        type:String,
        required:true
    },
    avatar:{
        type:String
    },
    msg:{
        type:String , required:true
    },
    timestamp:{type:Date, default: Date.now}
});

const chatSchema = new Schema<IChat>({
    roomId:{
        type:String,
        required:true,
        unique:true
    },
    serviceId:{
        type:Schema.Types.ObjectId,
        ref:"Service",
        required:true
    },
    participants:[{
        type:Schema.Types.ObjectId,
        ref:"User"
    }],
    msg:[messageSchema]
} , {timestamps:true})

export type chatDocument = mongoose.InferSchemaType<typeof chatSchema>;

export const ChatModel = mongoose.models.Chat  || mongoose.model<IChat>("Chat" , chatSchema);