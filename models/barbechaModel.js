import User from "./userModel.js";
import extendSchema from "mongoose-extend-schema";
import mongoose from "mongoose";

const barbechaSchema = extendSchema(User.schema, {
    phone: {type: Number, required: true},
    refTrolley: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trolley',
        required: false
    },
});

const Barbecha = mongoose.model('Barbecha', barbechaSchema)

export default Barbecha