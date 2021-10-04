import express from 'express'
import {protect, admin, protectCitizen, protectBarbecha} from '../Middleware/authMiddleware.js'
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
    updateCitizenByIdTogetRankAndScore,
    updateRatingBarbecha,
    getIronCitizen,
    getSilverCitizen,
    getGoldCitizen
} from '../controllers/userController.js'

const router = express.Router()

// Get citizen by rank
router
    .route('/citizen/iron')
    .get( protectCitizen,getIronCitizen)
router
    .route('/citizen/silver')
    .get( protectCitizen,getSilverCitizen)
router
    .route('/citizen/gold')
    .get( protectCitizen,getGoldCitizen)




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

// This function is protected by citizen because the citizen who is going to rate
router
    .route('/barbechas/rating/:id')
    .put(protectCitizen, updateRatingBarbecha)

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
