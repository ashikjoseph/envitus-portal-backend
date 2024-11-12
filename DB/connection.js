const mongoose = require('mongoose');

// Get the connection string from environment variables
const connectionString = process.env.DATABASE;

// Check if the connection string is missing
if (!connectionString) {
    console.error('Error: MongoDB connection string is missing!');
    process.exit(1); // Exit the application with an error code
}

// Log the connection string for debugging purposes
console.log('MongoDB URI:', connectionString);

// Set connection options
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// Try to connect to MongoDB
mongoose.connect(connectionString, options)
    .then(() => {
        console.log("MongoDB connected successfully!!!");
    })
    .catch((err) => {
        console.error(`MongoDB connection failed due to ${err}`);
    });
