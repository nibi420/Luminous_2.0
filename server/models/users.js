import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, "Please provide a name"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },

  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
  },

  password: {
    type: String,
    required: true,
    minlength: [8, "Minimum password length is 8 characters"],
    select: false,
  },

  profile_picture: {
    public_id: String,
    url: String,
  },

  role: {
    type: String,
    default: "user",
  },

  otp: Number,
  otpExpire: Date,

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },

  verified: {
    type: Boolean,
    default: false,
  },

  resetPasswordOtp: Number,
  resetPasswordOtpExpire: Date,
});

userSchema.pre("save", async function (next) {
  this.updatedAt = Date.now();
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME * 24 * 60 * 60 * 1000,
  });
};

userSchema.index({ otpExpire: 1 }, { expireAfterSeconds: 0 });

export const User = mongoose.model("User", userSchema);