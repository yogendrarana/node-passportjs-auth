import passport from 'passport';
import LocalStrategy from 'passport-local';
import { UserModel } from '../../models/userModel.js';

export const initializeLocalStrategy = () => {
    passport.use(new LocalStrategy(
        async (username, password, done) => {
            try {
                const user = await UserModel.findOne({ email: username });
                if (!user) return done(null, false);
                if (user.password !== password) return done(null, false);
                return done(null, user);
            } catch (error) {
                done(error, false);
            }
        }
    ))

    passport.serializeUser((user, done) => {
        done(null, user.id);
    })

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await UserModel.findById(id);
            done(null, user);
        } catch (error) {
            done(error, false);
        }
    })
}