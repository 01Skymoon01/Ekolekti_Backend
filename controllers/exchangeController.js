import express from 'express';
import mongoose from 'mongoose'
import Claim from '../models/claimModel.js';
import Exchange from "../models/exchangeModel.js";
import Trolley from "../models/trolleyModel.js";
import Barbecha from "../models/barbechaModel.js";
import FCM from "fcm-node";
import haversine from 'haversine-distance'
import {client} from "../server.js";
import Citizen from "../models/citizenModel.js";





const chooseBarbecha=  async (ExchangeMessages) => {


    // Find Client Position

    const ClientPosition = {"lat": ExchangeMessages.position.substring(0, ExchangeMessages.position.indexOf(",")),
        "lon": ExchangeMessages.position.substring(ExchangeMessages.position.indexOf(",")+1, ExchangeMessages.position.length)}

    // Choose barbecha..
    const BarbechaMessages = await Barbecha.find();
    let TrolleysPosition = [];
    for (let i = 0; i < BarbechaMessages.length; i++) {
        if(BarbechaMessages[i].refTrolley) {
            const TrolleyMessages = await Trolley.findById(BarbechaMessages[i].refTrolley);

            if(TrolleyMessages.latitude) {
                TrolleysPosition.push({
                    "_id": BarbechaMessages[i]._id,
                    "lat": TrolleyMessages.latitude,
                    "lon": TrolleyMessages.longitude
                })
            }
        }
    }

    let bestBarbeche = TrolleysPosition[0]._id;
    let minDistance= haversine(TrolleysPosition[0],ClientPosition)
    for (let i = 0; i < TrolleysPosition.length; i++) {

        if(minDistance > haversine(TrolleysPosition[i], ClientPosition)){
            minDistance = haversine(TrolleysPosition[i], ClientPosition);
            bestBarbeche = TrolleysPosition[i]._id
        }

    }

    return bestBarbeche;

}

// @desc    get Exchange
// @route   GET api/exchange
// @access  Public
const getExchange= async (req, res) => {

    try {
        const ExchangeMessages = await Exchange.find();

        res.status(200).json(ExchangeMessages);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};

// @desc    Add Exchange
// @route   POST api/exchange
// @access  Public
// @Json req
// {
//     "position": "ariana",
//     "quantities":
//     [
//         {"type": "simple plastic", "quantity": 10, "score": 10},
//         {"type": "hard plastic", "quantity": 9, "score": 9}
//     ],
//         "status": false,
//     "refBarbecha": "612c64819c05110980d8ab84",
//     "refCitizen": "6124e4c7cb54842ed0c868aa"
// }
const createExchange= async (req, res) => {

    const exchange = req.body;
    const newExchange = new Exchange(exchange);



    try {
        await newExchange.save();
         let bestBarbeche= await chooseBarbecha(newExchange);


        // Notification:
        let fcm = new FCM(process.env.serverKey)

        let message = {
            to : exchange.token,
            notification : {
                title: "an exchange",
                body: `exchange in ${bestBarbeche._id}`
            }
        }


        fcm.send(message, function(err, response){
            if (err) {
                console.log("Something has gone wrong!");
            } else {
                res.status(201).json(newExchange);
                console.log("Successfully sent with response: ", response);
            }
        });

    } catch (error) {
        res.status(409).json({message: error.message});
    }

};


// @desc    get map
// @route   Post api/exchange/map
// @access  Public 612c64819c05110980d8ab84
const getBarbechaMap= async (req, res) => {

    try {
        const { id } = req.body;

     
        const BarbechaMessages = await Barbecha.findById(id) ;
        const TrolleyMessages = await Trolley.findById(BarbechaMessages.refTrolley) ;
        const ExchangeMessages = await Exchange.find({"refBarbecha": id},{ position:1}) ;

        let copie2 = [];
        for (let i = 0; i < ExchangeMessages.length; i++) {

                copie2.push({"latitude": ExchangeMessages[i].position.substring(0, ExchangeMessages[i].position.indexOf(",")),
                    "longitude": ExchangeMessages[i].position.substring(ExchangeMessages[i].position.indexOf(",")+1, ExchangeMessages[i].position.length)})

        }


        res.status(200).json({DepartPosition: {"latitude": TrolleyMessages.latitude, "longitude":TrolleyMessages.longitude}, TargetPosition : copie2  });


    } catch (error) {
        res.status(404).json({message: error.message});
    }

};




// @desc    Update Exchange
// @route   Patch api/exchange/:id
// @access  Public
const updateExchange = async (req, res) =>{
    const { id } = req.params;
    //const { position, description} = req.body;

    const exchange = await Exchange.findById(id)

    if (!exchange) return res.status(404).send(`No exchange with id: ${id}`);

    exchange.date_exchange = req.body.date_exchange || exchange.date_exchange
    exchange.position = req.body.position || exchange.position
    exchange.quantities = req.body.quantities || exchange.quantities
    exchange.status = req.body.status || exchange.status
    exchange.refBarbecha = req.body.refBarbecha || exchange.refBarbecha
    exchange.refCitizen = req.body.refCitizen || exchange.refCitizen

    await Exchange.findByIdAndUpdate(id, exchange, { new: true });

    res.status(200).json(exchange);

};

// @desc    delete Exchange
// @route   Delete api/exchange/:id
// @access  Public
const deleteExchange=  async (req, res) =>{
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No trolley with id: ${id}`);

    await Exchange.findByIdAndDelete(id);

    res.status(204).json({message: 'Exchange deleted successfully'});
};



// @desc    get Exchange of a citizen sorted by date
// @route   GET api/exchange/citizen/:id (idcitizen)
// @access  Public
const getExchangeByIdCitizen= async (req, res) => {

    try {
        const { id } = req.params;
        const ExchangeMessages = await Exchange.find({refCitizen:id  }).sort({"createdAt": -1}) ;

        res.status(200).json(ExchangeMessages);
    } catch (error) {
        res.status(404).json({message: error.message});
    }

};



// @desc    get Exchange in progress by id barbecha
// @route   GET api/exchange/barbecha/:id (idBarbech)
// @access  Public
const getExchangeByIdBarbecha= async (req, res) => {

    try {
        const { id } = req.params;
        const ExchangeMessages = await Exchange.find({refBarbecha:id, status: false  }).sort({"createdAt": -1}) ;

        res.status(200).json(ExchangeMessages);
    } catch (error) {
        res.status(404).json({message: error.message});
    }

};




const notificationExchange= async (req, res) => {

    const token = req.body.token;
    const idClient = req.body.idClient;


    // Choose barbecha.

    try {


        // Notification:
        let fcm = new FCM(process.env.serverKey)
        var ex= await Exchange.findOne() ;
          console.log(ex);
        let message = {
            to : token,
            notification : {
                title: "an exchange",
                body: ex
            }
        }


        fcm.send(message, function(err, response){
            if (err) {
                console.log(err);
                console.log("Something has gone wrong!");
            } else {
                res.status(201).json(token);
                console.log("Successfully sent with response: ", response);
            }
        });

    } catch (error) {
        res.status(409).json({message: error.message});
    }

};

// @desc
// @route   PUT api/exchange/updateToken
// @access  Public
const updateToken= async (req, res) => {
    const token = req.body.token;
    const id = req.body.id;

    try{
        const Barbechemessage = await Barbecha.findByIdAndUpdate(id,{fireBaseToken: token}) ;
        res.status(205).json(Barbechemessage);
    }catch (e){
        res.status(409).json({message: error.message});
    }

}

const getWeight = async (req,res)=>{
    const type = req.body.type;
    const id = req.body.id;


    try{
        client.publish('INFO', JSON.stringify({
            "ID" : id,
            "t" : type
        }) )
        client.on('message', async (topic = "INFO", message) => {
            try {
                // Know The Topic
                console.log("/// messsage for topic :  " + topic);
                var ch = message.toString();
                const search = '\''
                const replacer = new RegExp(search, 'g')
                var n = ch.replace(replacer, '"');
                console.log(JSON.parse(n));

                res.status(204).json(JSON.parse(n).weight);
            } catch (e) {
                console.log(e);
            }
        })

       /*  setTimeout(function (e) {
            res.status(409).json({"message": e + "time is out"});
        },10000)
 */

    }catch(e){
         console.log(e);
       // res.status(409).json({message: error.message});

    }

}

const validedExchange = async (req,res) => {
    const type = req.body.type;
    const id = req.body.id;
    const weight = req.body.weight;

try{
    const Exchangemessage = await Exchange.findById(id);


    let quantities= []
    for(let i=0; i < Exchangemessage.quantities.length; i++ ){
        if(Exchangemessage.quantities[i].type === type) {
            Exchangemessage.quantities[i].quantity = weight
            quantities.push(Exchangemessage.quantities[i])

        }else quantities.push(Exchangemessage.quantities[i])

    }

    const NewExchangemessage = await Exchange.findByIdAndUpdate(id,{quantities: quantities}) ;


    res.status(204).json(NewExchangemessage);
}catch (e) {
    res.status(409).json({"message": e});
}



}

// @desc
// @route   PUT api/exchange/acceptNotif
// @access  Public
const acceptNotif  = async (req,res) => {
    const id = req.body.id;
    const refBarbecha = req.body.refBarbecha;
    try{
        const NewExchangemessage = await Exchange.findByIdAndUpdate(id,{refBarbecha: refBarbecha}) ;
        res.status(204).json(NewExchangemessage);

    }catch (e) {
        res.status(409).json({"message": e});

    }


}



// @desc
// @route   PUT api/exchange/confirmExchange
// @access  Public
const confirmExchange  = async (req,res) => {
    const id = req.body.id;

    try{
        const NewExchangemessage = await Exchange.findByIdAndUpdate(id,{status: true}) ;

        let score= 0;
        const Citizenmessage = await Citizen.findById(NewExchangemessage.refCitizen) ;

        score+= Citizenmessage.score ;
        for(let i=0; i < NewExchangemessage.quantities.length; i++){
            if(NewExchangemessage.quantities[i].type == "A")
                score+= NewExchangemessage.quantities[i].quantities * 30;
            else  if(NewExchangemessage.quantities[i].type == "B")
                 score+= NewExchangemessage.quantities[i].quantities * 50;
            else  if(NewExchangemessage.quantities[i].type == "C")
                score+= NewExchangemessage.quantities[i].quantities * 70;

                }


        const NewCitizenmessage = await Citizen.findByIdAndUpdate(NewExchangemessage.refCitizen,{score: score}) ;
        res.status(204).json(NewCitizenmessage);

    }catch (e) {
        res.status(409).json({"message": e});

    }


}



export {
    getExchange,
    createExchange,
    updateExchange,
    deleteExchange,
    getExchangeByIdCitizen,
    getExchangeByIdBarbecha,
    notificationExchange,
    chooseBarbecha,
    updateToken,
    getWeight,
    getBarbechaMap,
    acceptNotif,
    confirmExchange,
    validedExchange
};

