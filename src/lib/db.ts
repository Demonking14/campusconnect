import mongoose from "mongoose";
type connectionObject = {
    isConnected?: number
}

const connection: connectionObject = {};

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log("Database is already  connected");
        return;
    }
    try {
        const connecting = await mongoose.connect(process.env.MONGO_URI || "");
        connection.isConnected = connecting.connections[0].readyState;
        await import("@/models/user.model");
        await import("@/models/service.model");
        // console.log(connecting.connections[0].readyState);
        console.log("Db Connected Successfully");
    } catch (error) {
        console.log("Error in connecting to mongoDB", error);
        process.exit(1);
    }
}
export default dbConnect;