import express from 'express'
const router = express.Router()
import {
    getClaim,
    createClaim,
    updateClaim,
    deleteClaim
} from '../controllers/claimController.js'



// Trolley
router.route('/').post(createClaim)
router.route('/').get(getClaim)
router.route('/:id').put(updateClaim)
router.route('/:id').delete(deleteClaim)


export default router
