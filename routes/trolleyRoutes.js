import express from 'express'
const router = express.Router()
import {
    getTrolley,
    createTrolley,
    updateTrolley,
    deleteTrolley, getAllNoneTokenTrolley
} from '../controllers/trolleyController.js'



// Trolley
router.route('/').post(createTrolley)
router.route('/').get(getTrolley)
router.route('/nonetoken').get(getAllNoneTokenTrolley)
router.route('/:id').put(updateTrolley)
router.route('/:id').delete(deleteTrolley)


export default router
