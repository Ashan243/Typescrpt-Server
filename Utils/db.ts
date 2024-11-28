import mongoose from "mongoose";


export const ConnectDB = async(mongoURI: string) => {
    try {
        const conn = await mongoose.connect(mongoURI)
        if(!conn)
            console.error("Could not connect to DB")
    } catch (error) {
        console.log(error)
    }
} 