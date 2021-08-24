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
            required: false,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            default: bcrypt.hashSync('123456', 10), // hedhi bch tetna7a, hatitha bch t3awen fi cryptage w login
        },
        gender: {
            type: String,
            required: false,
        },
        dateBirth: {
            type: Date,
            required: false,
        },
        avatar: {
            type: String,
            required: false,
        },
        available: {
            type: Boolean,
            required: false,
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
