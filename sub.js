// MQTT subscriber
import mqtt from 'mqtt'
let client = mqtt.connect('mqtt://localhost:1234')
let topic = 'LINTANGtest123'

client.on('message', (topic, message)=>{
    message = message.toString()
    console.log(message)
})

client.on('connect', ()=>{
    client.subscribe(topic)
})