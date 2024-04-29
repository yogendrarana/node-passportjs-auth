import passport from "passport";
import { UserModel } from "../../models/userModel.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20"

// initialize google oauth2 strategy
export const initializeGoogleOauth2Strategy = () => {
    // google oauth2 strategy options
    const options = {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_REDIRECT_URI,
        passReqToCallBack: true,
        scope: ["email", "profile"],
    }

    passport.use(new GoogleStrategy(options, async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await UserModel.findOne({ email: profile.emails[0].value });
            if (!user) {
                const newUser = new UserModel({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    avatar: profile.photos[0].value,
                    googleId: profile.id,
                });

                user = await newUser.save();
            }

            done(null, user._id);
        } catch (err) {
            done(err, null);
        }
    }));

    // Serialize the user id
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    // Deserialize the user id
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await UserModel.findById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
}