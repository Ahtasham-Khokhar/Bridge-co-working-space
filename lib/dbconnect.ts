import mongoose from "mongoose";
const MongoDB_url = process.env.MongoDB_URL


interface connectionType {
    isConnected?:number;
}

const connection : connectionType = {};

async function dbconnect():Promise<void>{
    if(connection.isConnected){
        console.log("Already connected to database");
        return;
    }

    try {
        if(!MongoDB_url){
            throw new Error("MongoDB URL is not defined in environment variables");
        }
        const db = await mongoose.connect(MongoDB_url);
        connection.isConnected = db.connections[0].readyState;
        console.log("Connected to database");

    } catch (error) { 
        console.log("Error connecting to database", error);
        throw new Error("Error reading MongoDB URL from environment variables");
    }
}

export default dbconnect;