import express from 'express';
import mongoose from 'mongoose'
import Trolley from '../models/trolleyModel.js';


// @desc    get trolleys
// @route   GET api/trolley
// @access  Public
const getTrolley= async (req, res) => {

    try {
        const trolleyMessages = await Trolley.find();

        res.status(200).json(trolleyMessages);
    } catch (error) {
        res.status(404).json({message: error.message});
    }

};

// @desc    Add trolley
// @route   POST api/trolley
// @access  Public
const createTrolley= async (req, res) => {

    const trolley = req.body;
    const newTrolley = new Trolley(trolley);

    try {
        await newTrolley.save();

        res.status(201).json(newTrolley);
    } catch (error) {
        res.status(409).json({message: error.message});
    }

};


// @desc    Update trolley name + desc
// @route   Patch api/trolley/:id
// @access  Public
const updateTrolley = async (req, res) =>{
    const { id } = req.params;
    //const { position, description} = req.body;

    const trolley = await Trolley.findById(id)

    if (!trolley) return res.status(404).send(`No trolley with id: ${id}`);

    trolley.position = req.body.position || trolley.position
    trolley.description = req.body.description || trolley.description || null
    trolley.available = req.body.available || trolley.available || null
    trolley.weight = req.body.weight || trolley.weight || null

    await Trolley.findByIdAndUpdate(id, trolley, { new: true });

    res.status(200).json(trolley);

};

// @desc    delete trolley
// @route   Delete api/trolley/:id
// @access  Public
const deleteTrolley=  async (req, res) =>{
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No trolley with id: ${id}`);

    await Trolley.findByIdAndDelete(id);

    res.status(204).json({message: 'Category deleted successfully'});
};


export {
    getTrolley,
    createTrolley,
    updateTrolley,
    deleteTrolley
};
