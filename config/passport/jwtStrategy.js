import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { UserModel } from "../../models/userModel.js";
import ErrorHandler from "../../util/errorHandler.js";

// jwt options
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "jwtsecret"
}

// initialize jwt strategy
export function initializeJwtStrategy() {
    // jwt strategy
    passport.use(new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
        // jwtPayload is the decoded jwt token
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
    }))
}