import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String },
    name: { type: String },
    avatar: { type: String },
    googleId: { type: String },
});

export const UserModel = mongoose.model('User', userSchema);