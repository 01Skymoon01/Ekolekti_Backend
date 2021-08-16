import mongoose from 'mongoose'

const trolleySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
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