import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { UserModel } from "../../models/userModel.js";
import ErrorHandler from "../../util/errorHandler.js";

// initialize jwt strategy
export function initializeJwtStrategy() {
    // jwt options
    const options = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: "jwtsecret"
    }

    // jwt strategy
    // jwtPayload is the decoded jwt token
    passport.use(new JwtStrategy(options, async (jwtPayload, done) => {
        try {
            const user = await UserModel.findById(jwtPayload._id);

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