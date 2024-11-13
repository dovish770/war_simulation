import mongoose, { Document, Schema } from 'mongoose';
import IUser from '../../types/user';

const userSchema: Schema<IUser> = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    organization: {
        type: String,
        required: true,
        enum: ['IDF', 'Hezbollah', 'Hamas', 'IRGC', 'Houthis']
    },
    region: {
        type: String,
        enum: ['North', 'South', 'Center', 'West Bank']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model<IUser>('User', userSchema);
