import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true,
    }
)
userSchema.methods.matchPassword = async function(enteredPasswaord) {
    return await bcrypt.compare(enteredPasswaord, this.password)
}

userSchema.methods.hashPassword = async function(enteredPasswaord) {
    return await bcrypt.hash(enteredPasswaord, 10)
}

const User = mongoose.model('User', userSchema)

export default User