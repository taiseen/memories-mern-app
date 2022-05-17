import mongoose from "mongoose";

const mongoDB = async () => {
    
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected To MongoDB ==> OK ✅");
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export default mongoDB;