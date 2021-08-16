import express from 'express'
const router = express.Router()
import {
    getTrolley,
    createTrolley,
} from '../controllers/trolleyController.js'



// Trolley
router.route('/').post(createTrolley)
router.route('/').get(getTrolley)


export default router