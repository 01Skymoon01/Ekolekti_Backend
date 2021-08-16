import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import {errorHandler, notFound} from "./Middleware/errorMiddleware.js";
import userRoutes from './routes/userRoutes.js'
import trolleyRoutes from './routes/trolleyRoutes.js'

dotenv.config()

connectDB()

const app = express()
//  This is added to accept json data in the body
app.use(express.json())

app.get('/api', (req,res) =>{
    res.send('API is running...')
})

// @DESC Call User Route
app.use('/api/users', userRoutes)

// @DESC Call Trolley Route
app.use('/api/trolley', trolleyRoutes)


app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`))