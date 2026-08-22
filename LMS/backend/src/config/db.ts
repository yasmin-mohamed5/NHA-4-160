// export default connectDB;
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async (): Promise<void> => {
    try {
        const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/techBase';

        const connection = await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 10000,
        });

        console.log(`MongoDB Connected: ${connection.connection.host}`);

    } catch (error) {
        console.error(
            error instanceof Error ? error.message : 'Unknown database error'
        );
        process.exit(1);
    }
};

export default connectDB;