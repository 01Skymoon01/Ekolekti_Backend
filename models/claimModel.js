import mongoose from 'mongoose'

const claimSchema = mongoose.Schema(
    {
        type: {
            type: String,
            required: false,
        },
        description: {
            type: String,
            required: false,
            default: ""
        },
        message: {
            type: String,
            required: false,
            default: ""
        },
        refCitizen:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Citizen',
            required: false
        },
        status: {
            type: Boolean,
            required: false,
        }
    },
    {
        timestamps: true,
    }
)

const Claim = mongoose.model('Claim', claimSchema)

export default Claim
