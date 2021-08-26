import express from 'express'
const router = express.Router()
import {
    getExchange,
    createExchange,
    updateExchange,
    deleteExchange
} from '../controllers/exchangeController.js'



// Trolley
router.route('/').post(createExchange)
router.route('/').get(getExchange)
router.route('/:id').put(updateExchange)
router.route('/:id').delete(deleteExchange)


export default router
