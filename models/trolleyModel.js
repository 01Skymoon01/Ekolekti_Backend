import mongoose from 'mongoose'

const trolleySchema = mongoose.Schema(
    {
        weight: {
            type: Number,
            required: false,
        },
        name: {
            type: String,
            required: false,
        },
        description: {
            type: String,
            required: false,
            default: ""
        },
        position: {
            type: String,
            required: false,
        },
        available: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    {
        timestamps: true,
    }
)

const Trolley = mongoose.model('Trolleys', trolleySchema)

export default Trolley
