const mongoose = require("mongoose");

const connectDB = async () => {
    try {

        console.log(process.env.MONGO_URI);

        const connection = await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected Successfully!");
        console.log(`Host: ${connection.connection.host}`);

    }
    catch(error) {
        console.error("Database Connection Failed!")
        console.error(error.message);
        process.exit(1);
    }
};

module.exports = connectDB;