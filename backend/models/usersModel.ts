// models/usersModel.ts
import { Document, model, Schema } from 'mongoose';

// Define the IUser interface
interface IUser extends Document {
    name: string;
    email: string;
    password_hash: string; // or whatever the field for the password is
    createdAt: Date;
    updatedAt: Date;
}

// Define the user schema
const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
}, { timestamps: true });

// Create the User model
const User = model<IUser>('User', userSchema);
export default User;
export type { IUser }; // Export the IUser interface
