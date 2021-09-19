import express from 'express'
const router = express.Router()
import {
    getExchange,
    createExchange,
    updateExchange,
    deleteExchange,
    getExchangeByIdCitizen
} from '../controllers/exchangeController.js'
import {protectCitizen} from "../Middleware/authMiddleware.js";



// Trolley
router.route('/').post(createExchange)
router.route('/').get(getExchange)
router
    .route('/:id')
    .get(protectCitizen, getExchangeByIdCitizen)
router.route('/:id').put(updateExchange)
router.route('/:id').delete(deleteExchange)


export default router
