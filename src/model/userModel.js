import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Please enter user name.."],
    unique: true
  },
  email: {
    type: String,
    required: [true, "Please enter an email.."],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Please enter password.."],
    unique: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
})

// Check if model is already present if preset it choose it other wise create new
const User = mongoose.models.users || mongoose.model('users', userSchema);

export default User;