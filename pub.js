// MQTT publisher
import mqtt from 'mqtt'
var client = mqtt.connect('mqtt://localhost:1234')
var topic = 'LINTANGtest123'
var message = 'Hello World!'

client.on('connect', ()=>{
    setInterval(()=>{
        client.publish(topic, message)
        console.log('Message sent!', message)
    }, 5000) // chaque 5sec
})