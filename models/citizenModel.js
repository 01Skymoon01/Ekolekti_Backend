import User from "./userModel.js";
import extendSchema from "mongoose-extend-schema";
import mongoose from "mongoose";

const citizenSchema = extendSchema(User.schema, {
    phone: {type: Number, required: false},
    score: {type: Number, required: true, default: 0},
    refExchange: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exchange',
        required: false
    },
});

const Citizen = mongoose.model('Citizen', citizenSchema)

export default Citizen
