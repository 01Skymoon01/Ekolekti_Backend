import dotenv from 'dotenv'
import users from './data/users.js'
import User from './models/userModel.js'

import connectDB from "./config/db.js";

dotenv.config()

connectDB()


const importData = async () => {
    try{
        await User.deleteMany()

        const createdUsers =  await User.insertMany(users)
        const adminUser = createdUsers[0]._id


        console.log(`Data imported`)
        process.exit()

    }catch (e) {
        console.log(`${e}`)
        process.exit(1)
    }
}


const destroyData = async () => {
    try{
        await User.deleteMany()
        console.log(`Data destroyed`)
        process.exit()

    }catch (e) {
        console.error(`${e}`)
        process.exit(1)
    }
}

if(process.argv[2] === '-d'){
    destroyData()
} else {
    importData()
}
