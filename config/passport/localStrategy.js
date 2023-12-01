import passport from 'passport';
import LocalStrategy from 'passport-local';
import { UserModel } from '../../models/userModel.js';
import ErrorHandler from '../../util/errorHandler.js';

export const initializeLocalStrategy = () => {
    passport.use(new LocalStrategy(
        async (username, password, done) => {
            try {
                const user = await UserModel.findOne({ email: username });

                if (!user) {
                    return done(new ErrorHandler("User does not exist", 400), false);
                } 

                if (user.password !== password) {
                    return done(new ErrorHandler("Password do not match", 400), false);
                } 

                return done(null, user);
            } catch (error) {
                done(new ErrorHandler(error.message, error.code), false);
            }
        }
    ))

    passport.serializeUser((user, done) => {
        // pass the value of user._id to done callback 
        // this value will be stored in session
        // usually we use the primary key of the user document
        done(null, user._id);
    })

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await UserModel.findById(id);

            if (!user) {
                return done(new ErrorHandler("User does not exist", 400), false);
            }

            done(null, user);
        } catch (error) {
            done(new ErrorHandler(error.message, error.code), false);
        }
    })
}