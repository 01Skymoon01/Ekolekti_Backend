import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'
import bcrypt from "bcryptjs";
import Barbecha from "../models/barbechaModel.js";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })


    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, gender, dateBirth, phone } = req.body

    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // // hashPassword
    // let passwordb = await bcrypt.hash(password, 10)
    let passwordCrypt= bcrypt.hashSync(password, 10)

    const user = await User.create({
        name,
        email,
        passwordCrypt,
        gender,
        phone,
        dateBirth
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.status(205).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.status(200).json(users)
})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        await user.remove()
        res.status(204).json({ message: 'User removed' })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')

    if (user) {
        res.status(200).json(user)
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin

        const updatedUser = await user.save()

        res.status(205).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// ***** For Barbechas *****

// @desc    Add barbecha
// @route   POST /api/users/barbechas
// @access  Private/Admin (in process)
// {
//     "name": "barbecha1",
//     "email": "bar@bar3.com",
//     "phone": 23232323,
//     "refTrolley": "611a24390b2308294c62bc9e"
// }
const addBarbecha = asyncHandler(async (req, res) => {
    const barbecha = req.body

    const newBarbecha = new Barbecha(barbecha);

    await newBarbecha.save();

    if (newBarbecha) {

        res.status(201).json(newBarbecha)
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})


// @desc    Get barbacha by id
// @route   GET /api/users/barbechas/:id
// @access  Private/Admin (in process)
const getBarbachaById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await Barbecha.findById(id)

    if (user) {
        res.status(200).json(user)
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    Get all Barbechas
// @route   GET /api/users/barbechas
// @access  Private/Admin (in process)
const getBarbechas = asyncHandler(async (req, res) => {
    const users = await Barbecha.find()
    res.status(200).json(users)
})

// @desc    Update Barbecha
// @route   PUT /api/users/barbechas/:id
// @access  Private/Admin (in process)
// {
//     "email": "bar@bar11.com"
// }
const updateBarbecha = asyncHandler(async (req, res) => {
    const user = await Barbecha.findById(req.params.id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.phone = req.body.phone || user.phone
        user.refTrolley = req.body.refTrolley || user.refTrolley || null

        const updatedUser = await user.save()

        res.status(205).json(updatedUser)
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    Delete barbecha
// @route   DELETE /api/users/barbechas/:id
// @access  Private/Admin (in process)
const deleteBarbecha = asyncHandler(async (req, res) => {
    const user = await Barbecha.findById(req.params.id)

    if (user) {
        await user.remove()
        res.status(204).json({ message: 'User removed' })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})
export {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
    // For barbechas
    addBarbecha,
    getBarbachaById,
    getBarbechas,
    updateBarbecha,
    deleteBarbecha
}
