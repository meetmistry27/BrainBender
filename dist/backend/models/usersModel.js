"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const mongoose = require('mongoose');
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
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
const User = mongoose_1.default.model('User', UserSchema);
exports.default = User;
//# sourceMappingURL=usersModel.js.map