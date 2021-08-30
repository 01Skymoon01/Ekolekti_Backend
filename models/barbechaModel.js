import User from "./userModel.js";
import extendSchema from "mongoose-extend-schema";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const barbechaSchema = extendSchema(User.schema, {
    refTrolley: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trolley',
        required: false
    }
});
barbechaSchema.methods.matchPassword = async function(enteredPasswaord) {
    return await bcrypt.compare(enteredPasswaord, this.password)
}
const Barbecha = mongoose.model('Barbecha', barbechaSchema)

export default Barbecha
