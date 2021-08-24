import mongoose from 'mongoose'

const exchangeSchema = mongoose.Schema(
    {
        date_exchange: {
            type: Date,
            required: false,
        },
        position: {
            type: String,
            required: false,
            default: ""
        },
        quantities: [ {
            type: {
                type: String,
                required: false,
                default: ""
            },
            quantity: {
                type: String,
                required: false,
                default: ""
            },
            score: {
                type: Number,
                required: false,
            },}
        ],
        status: {
            type: Boolean,
            required: false,
        },
        refBarbecha:  {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Barbecha',
            required: false
        },
        refCitizen: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Citizen',
            required: false
        },
    },
    {
        timestamps: true,
    }
)

const Exchange = mongoose.model('Exchange', exchangeSchema)

export default Exchange
