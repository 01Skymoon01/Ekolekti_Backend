import User from "./userModel.js";
import extendSchema from "mongoose-extend-schema";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const barbechaSchema = extendSchema(User.schema, {
    refTrolley: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trolley',
        required: false
    },
    totalWeight: {
        type: Number,
        required: true,
        default: 0,
    },
    sum_rating: {
        type: Number,
        required: true,
        default: 0,
    },
    total_users_rated: {
        type: Number,
        required: true,
        default: 0,
    },
});
barbechaSchema.methods.matchPassword = async function(enteredPasswaord) {
    return await bcrypt.compare(enteredPasswaord, this.password)
}
const Barbecha = mongoose.model('Barbecha', barbechaSchema)

export default Barbecha
