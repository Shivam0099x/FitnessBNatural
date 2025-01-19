import mongoose from 'mongoose';

let isConnected = false;

const connectToDatabase = async () => {
  if (isConnected) {
    console.log('Using existing MongoDB connection');
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI)

    isConnected = db.connections[0].readyState === 1;
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    throw new Error('Database connection failed');
  }
};

export default connectToDatabase;
