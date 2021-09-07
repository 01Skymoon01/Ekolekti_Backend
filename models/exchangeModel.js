import mongoose from 'mongoose'

const exchangeSchema = mongoose.Schema(
    {
        // Wa9eth saret exchange
        date_exchange: {
            type: Date,
            required: false,
        },
        // Position Client
        position: {
            type: String,
            required: false,
            default: ""
        },
        // Etapes:
        // 0 (notification)=> type: connu + quantity: estimation + score: estimation (bch n3awnou client yaaref score) + status: 0
        // 1 (durant l'exchange)=> type: connu(checkout) + quantity: mesure + score: calculer + status: 0
        // 2 (validation de l'exhange)=> type: connu(checkout) + quantity: validé + score: calculer + status: 1
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
