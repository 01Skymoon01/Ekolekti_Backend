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
    authCitizen,
    authBarbecha,
    checkInProgressExchange,
    updateAvailabilityBarbecha,
    getCitizenByIdTogetRankAndScore,
    updateCitizenByIdTogetRankAndScore
} from '../controllers/userController.js'
import {protect, admin, protectCitizen, protectBarbecha} from '../middleware/authMiddleware.js'



// ***** Citizen *****
router
    .route('/citizen')
    .post(registerCitizen)

router
    .route('/citizen/login')
    .post(authCitizen)

router
    .route('/citizen/:id')
    .get(protectCitizen, getCitizenById)

// To check if there is an exchange is already in process
router
    .route('/citizen/exchange/:id')
    .get(protectCitizen, checkInProgressExchange)

router
    .route('/citizen/lvl/:id')
    .get(protectCitizen, getCitizenByIdTogetRankAndScore)

router
    .route('/citizen/lvl/:id')
    .put(protectCitizen, updateCitizenByIdTogetRankAndScore)

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

router
    .route('/barbechas/availability/:id')
    .put(protectBarbecha , updateAvailabilityBarbecha)

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
