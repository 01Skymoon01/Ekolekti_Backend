import express from 'express';
import mongoose from 'mongoose'
import Trolley from '../models/trolleyModel.js';
import Claim from '../models/claimModel.js';


// @desc    get Claim
// @route   GET api/claim
// @access  Public
const getClaim= async (req, res) => {

    try {
        const ClaimMessages = await Claim.find();

        res.status(200).json(ClaimMessages);
    } catch (error) {
        res.status(404).json({message: error.message});
    }

};

// @desc    Add Claim
// @route   POST api/claim
// @access  Public
const createClaim= async (req, res) => {

    const claim = req.body;
    const newclaim = new Claim(claim);

    try {
        await newclaim.save();

        res.status(201).json(newclaim);
    } catch (error) {
        res.status(409).json({message: error.message});
    }

};


// @desc    Update claim name + desc
// @route   Patch api/claim/:id
// @access  Public
const updateClaim = async (req, res) =>{
    const { id } = req.params;
    //const { position, description} = req.body;

    const claim = await Claim.findById(id)

    if (!claim) return res.status(404).send(`No claim with id: ${id}`);

    claim.type = req.body.type || claim.type
    claim.description = req.body.description || claim.description || null
    claim.refCitizen = req.body.refCitizen || claim.refCitizen
    claim.status = req.body.status || claim.status

    await Claim.findByIdAndUpdate(id, claim, { new: true });

    res.status(200).json(claim);

};

// @desc    delete claim
// @route   Delete api/claim/:id
// @access  Public
const deleteClaim=  async (req, res) =>{
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No trolley with id: ${id}`);

    await Claim.findByIdAndDelete(id);

    res.status(204).json({message: 'Category deleted successfully'});
};


export {
    getClaim,
    createClaim,
    updateClaim,
    deleteClaim
};

