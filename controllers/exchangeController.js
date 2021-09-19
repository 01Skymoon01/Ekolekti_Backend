import express from 'express';
import mongoose from 'mongoose'
import Claim from '../models/claimModel.js';
import Exchange from "../models/exchangeModel.js";


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

    // Choose barbecha..

    try {
        await newExchange.save();

        res.status(201).json(newExchange);
    } catch (error) {
        res.status(409).json({message: error.message});
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



// @desc    get Exchange of a user sorted by date
// @route   GET api/exchange/:id (idcitizen)
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

export {
    getExchange,
    createExchange,
    updateExchange,
    deleteExchange,
    getExchangeByIdCitizen
};

