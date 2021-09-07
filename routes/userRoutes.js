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
    deleteBarbecha,
    registerCitizen,
    getCitizenById,
    authCitizen, authBarbecha
} from '../controllers/userController.js'
import { protect, admin, protectCitizen } from '../middleware/authMiddleware.js'

// ***** Citizen *****
router
    .route('/citizen')
    .post(registerCitizen)

router
    .route('/citizen/login')
    .post(authCitizen)

router
    .route('/citizen/:id')
    .post(protectCitizen, getCitizenById)

// ***** Barbecha *****
router
    .route('/barbechas')
    .post(addBarbecha)

router
    .route('/barbechas/login')
    .post(authBarbecha)

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
