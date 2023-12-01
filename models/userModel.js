import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    email: { type: String },
    password: { type: String },
});

export const UserModel = mongoose.model('User', userSchema);