import mosca from 'mosca';

let settings = {port: 1234}

let broker = new mosca.Server(settings)

broker.on('ready',()=> {
    console.log("Broker is ready!")
})

