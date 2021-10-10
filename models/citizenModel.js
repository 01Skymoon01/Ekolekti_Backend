import User from "./userModel.js";
import extendSchema from "mongoose-extend-schema";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const citizenSchema = extendSchema(User.schema, {
    score: {type: Number, required: true, default: 0},
    // lvl0- Iron / lvl1- Silver / lvl2- Gold
    rank: {type: String, required: true, default: "iron"},
    // Just for testing
    refExchange: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exchange',
        required: false
    },
},);

citizenSchema.methods.matchPassword = async function(enteredPasswaord) {
    return await bcrypt.compare(enteredPasswaord, this.password)
}


const Citizen = mongoose.model('Citizen', citizenSchema)

export default Citizen
