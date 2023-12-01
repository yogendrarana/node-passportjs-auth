import { UserModel } from '../models/userModel.js'
import ErrorHandler from '../util/errorHandler.js'
import { asyncHandler } from '../util/asyncHandler.js'

// register user
export const registerUser = asyncHandler(async (req, res, next) => {
    const { username:email, password } = req.body;

    if (!email || !password) return next(new ErrorHandler("Please provide an email and password.", 400))

    const exists = await UserModel.findOne({ email });

    if (exists) return next(new ErrorHandler("User already exists.", 400))

    const user = await UserModel.create({ email, password });

    res.status(201).json({ status: 'success', message: "Account created successfully.", data: { user } })
})


// login user
export const loginUser = asyncHandler(async (req, res, next) => {
    res.status(200).json({ status: 'success', message: "Login successful.", data: { user: req.user } })
})