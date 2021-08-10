import mongoose from "mongoose";

// @DESC this file is configured to connect to the data base: mongo
//       process.env.MONGO_URI: you can find it in .env

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })

        console.log(`Mongodb Connected: ${conn.connection.host}`.cyan.underline)
    } catch (e) {
        console.error(`Error: ${e.message}`.red.underline.bold)
        process.exit(1)
    }
}

export default connectDB