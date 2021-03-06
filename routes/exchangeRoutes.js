import express from 'express'
const router = express.Router()
import {
    getExchange,
    createExchange,
    updateExchange,
    deleteExchange,
    getExchangeByIdCitizen,
    getWeight,
    getBarbechaMap,
    getExchangeByIdBarbecha,
    notificationExchange, chooseBarbecha, updateToken, validedExchange, acceptNotif, confirmExchange
} from '../controllers/exchangeController.js'
import {protectBarbecha, protectCitizen} from "../Middleware/authMiddleware.js";



// Trolley
router.route('/bestBarbeche').post(chooseBarbecha)
router.route('/updateToken').put(updateToken)
router.route('/validedExchange').put(validedExchange)
router.route('/acceptNotif').put(acceptNotif)
router.route('/confirmExchange').put(confirmExchange)
router.route('/getweight').post(getWeight)



router.route('/').post(createExchange)
router.route('/').get(getExchange)
router.route('/:id').put(updateExchange)
router.route('/:id').delete(deleteExchange)
router.route('/map').post(getBarbechaMap)
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
