import mongoose from 'mongoose'

const trolleySchema = mongoose.Schema(
    {
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
            default: ""
        }
    },
    {
        timestamps: true,
    }
)

const Trolley = mongoose.model('Trolleys', trolleySchema)

export default Trolley