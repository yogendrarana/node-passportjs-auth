import { UserModel } from '../models/userModel.js'
import ErrorHandler from '../util/errorHandler.js'
import { asyncHandler } from '../util/asyncHandler.js'

// login user
export const loginUser = asyncHandler(async (req, res, next) => {
    res.status(200).json({ status: 'success', message: "Login successful.", data: { user: req.user } })
})


// register user
export const registerUser = asyncHandler(async (req, res, next) => {
    const { username: email, password } = req.body;

    if (!email || !password) return next(new ErrorHandler("Please provide an email and password.", 400))

    const exists = await UserModel.findOne({ email });

    if (exists) return next(new ErrorHandler("User already exists.", 400))

    const user = await UserModel.create({ email, password });

    res.status(201).json({ status: 'success', message: "Account created successfully.", data: { user } })
})

// logout user
export const logoutUser = asyncHandler(async (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed' });
        }
        res.redirect('/login');
    });
})


// google auth
// this function redirects user to google's consent screen
//  we can also achieve this by using passport.authenticate('google', { scope: ['profile', 'email'] })
export const googleAuth = (req, res) => {
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

    const options = {
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        client_id: process.env.GOOGLE_CLIENT_ID,
        response_type: "code",
        prompt: "consent",
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
        ].join(" "),
    };

    const queryString = new URLSearchParams(options);

    const url = `${rootUrl}?${queryString.toString()}`

    res.redirect(url);
}
