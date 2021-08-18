import express from 'express'
const router = express.Router()
import {
    getTrolley,
    createTrolley,
    updateTrolley
} from '../controllers/trolleyController.js'



// Trolley
router.route('/').post(createTrolley)
router.route('/').get(getTrolley)
router.route('/:id').put(updateTrolley)


export default router