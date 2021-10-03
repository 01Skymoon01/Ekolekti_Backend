import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import {errorHandler, notFound} from "./Middleware/errorMiddleware.js";
import userRoutes from './routes/userRoutes.js'
import trolleyRoutes from './routes/trolleyRoutes.js'
import claimRoutes from './routes/claimRoutes.js'
import exchangeRoutes from './routes/exchangeRoutes.js'

import mosca from 'mosca';
import mqtt from "mqtt";


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

// @DESC Call Claim Route
app.use('/api/claim', claimRoutes)


// @DESC Call Exchange Route
app.use('/api/exchange', exchangeRoutes)

// MQTT PART :Broker => mosca + mqtt **
var options = {
    host: '07a68d3e221144d5b599622ca721ffdc.s1.eu.hivemq.cloud',
    port: 8883,
    protocol: 'mqtts',
    username: 'ekolekti',
    password: '@1Ekolekti'
}

let settings = {
    port:8883
}
let broker = new mosca.Server(settings)

broker.on('ready',()=> {
    console.log("Broker is ready!")
})

// SUB + PUB

let client = mqtt.connect(options)

// Topics:
let topicGPS = 'GPS'
let topicWeight = 'WEIGHT'
let topicInfo= 'INFO'

// Messages for testing:
let messageGPS = {
  position : {
      latitude : "256256",
      longitude : "000000"
  },
    batteries : 25
}

let messageWeight = {
    exchangeID : "id123456",
    type : "hard",
    weight: 25
}

let messageInfo = {
    exchangeID : "id123456",
    type : "hard"
}



// Event
client.on('message', (topic, message)=>{
    message = message.toString()
    console.log(message)
})

client.on('connect', ()=>{
    // client.subscribe(topicGPS)
    // client.subscribe(topicWeight)
    client.subscribe(topicInfo)

    setInterval(()=>{
        client.publish(topicInfo, messageInfo.exchangeID)
        console.log('messageInfo.exchangeID: ', messageInfo.exchangeID)

        // client.publish(topicGPS, messageGPS.batteries)
        // console.log('messageGPS.batteries: ', messageGPS.batteries)
        //
        // client.publish(topicWeight, messageWeight.weight)
        // console.log('messageWeight.weight: ', messageWeight.weight)
    }, 5000) // chaque 5sec

})


//Broker
broker.on('published', (packet)=>{
    let message = packet.payload.toString()
    console.log(message)
})


app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 8080

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`))