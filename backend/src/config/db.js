import mongoose from 'mongoose';

export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");
    }catch(err) {
        console.error("MongoDB connection failed", err);
        // Consider not calling process.exit(1) in serverless to avoid 502s
        process.exit(1);
    }
};

