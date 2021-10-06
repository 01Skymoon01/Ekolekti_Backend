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
        latitude: {
            type: String,
            required: false,
            default: ""
        },
        longitude: {
            type: String,
            required: false,
            default: ""
        },
        volume: {
            type: String,
            required: true,
            default: 0,
        },
        available: {
            type: Boolean,
            required: true,
            default: false
        },
        tokenStatus: {
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
