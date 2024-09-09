// const mongoose = require('mongoose');
import mongoose, { model } from 'mongoose';

const UserSchema = new mongoose.Schema({
    // user_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     default: () => new mongoose.Types.ObjectId(),
    //     index: true,
    // },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password_hash: {
        type: String,
        required: true,
    },
    google_id: {
        type: String,
    },
    otp: {
        type: String,
    }
}, { timestamps: true });

//module.exports = mongoose.model('User', UserSchema) ;
//export default mongoose.model('User', UserSchema);
const User = mongoose.model('User', UserSchema);
export default User;