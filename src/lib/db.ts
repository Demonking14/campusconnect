import mongoose from "mongoose";

type connectionObject = {
    isConnected?: number
}

const connection: connectionObject = {}; // By this function we will get to know whether our database is already connected or not so that we just do DoS attack by connecting to already connected server all time.

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log("Database is already  connected");
        return;
    }
    try {
        const connecting = await mongoose.connect(process.env.MONGO_URI || "");
        connection.isConnected = connecting.connections[0].readyState;
        // This connecting.connections[0].readyState gives us a number type id that we are storing in our connection variable to check whethere our database is already connected or not.
        await import("@/models/user.model"); 
        await import("@/models/service.model");
        // We are just importing our models so that while db is getting connected our model is prepared to use and operations
        // console.log(connecting.connections[0].readyState); its just here for debug purpose .
        console.log("Db Connected Successfully");
    } catch (error) {
        console.log("Error in connecting to mongoDB", error);
        process.exit(1);
    }
}
export default dbConnect;