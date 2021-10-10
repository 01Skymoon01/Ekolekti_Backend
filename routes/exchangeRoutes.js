import express from 'express'
const router = express.Router()
import {
    getExchange,
    createExchange,
    updateExchange,
    deleteExchange,
    getExchangeByIdCitizen,
    getExchangeByIdBarbecha,
    notificationExchange
} from '../controllers/exchangeController.js'
import {protectBarbecha, protectCitizen} from "../Middleware/authMiddleware.js";



// Trolley
router.route('/').post(createExchange)
router.route('/').get(getExchange)
router.route('/:id').put(updateExchange)
router.route('/:id').delete(deleteExchange)
router
    .route('/citizen/:id')
    .get(protectCitizen, getExchangeByIdCitizen)
router
    .route('/barbecha/:id')
    .get(protectBarbecha, getExchangeByIdBarbecha)

router
    .route('/barbecha/notification')
    .post(protectBarbecha, notificationExchange)

export default router
