import express from 'express'
const router = express.Router()
import {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
    addBarbecha,
    getBarbachaById,
    getBarbechas,
    updateBarbecha,
    deleteBarbecha
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

// ***** Barbecha *****
router
    .route('/barbechas')
    .post(addBarbecha)

router
    .route('/barbechas')
    .get(getBarbechas)

router
    .route('/barbechas/:id')
    .get(getBarbachaById)
    .put(updateBarbecha)
    .delete(deleteBarbecha)

// ***** User *****
router.route('/').post(registerUser).get(protect, admin, getUsers)

router.post('/login', authUser)

router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)

router
    .route('/:id')
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser)




export default router