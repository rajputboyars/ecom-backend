import mongoose from 'mongoose';

// MongoDB connection URL (you should store sensitive info like DB URL in environment variables)
const dbURI = process.env.MONGO_URI || "mongodb+srv://rajputabhishek12357:8Qm5Yd37UkGM2unt@cluster0.t343g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Function to connect to MongoDB
export const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);  // Exit the process with a failure code
  }
};
