import { User } from "../models/users.js";
import { sendMail } from "../utils/sendMail.js";
import { sendToken } from "../utils/sendToken.js";

export const register = async (req, res) => {
  try {
    const { fullname, email, username, password, role } = req.body;

    // const { profile_picture } = req.files;

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    let userName = await User.findOne({ username });

    if (userName) {
      return res.status(400).json({
        success: false,
        message: "Username already exists",
      });
    }

    const otp = Math.floor(Math.random() * 10000);

    user = await User.create({
      fullname,
      email,
      username,
      password,
      profile_picture: {
        public_id: "",
        url: "",
      },
      role,
      otp,
      otpExpire: Date.now() + 60 * 1000 * 5,
    });

    await sendMail(email, otp);
    sendToken(res, user, 201, "OTP sent to your email");
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const verify = async (req, res) => {
  try {
    const otp = Number(req.body.otp);

    const user = await User.findById(req.user._id);

    if (user.otp !== otp || user.otpExpire < Date.now()) {
      return res.status(200).json({
        success: false,
        message: "Invalid OTP or OTP expired",
      });
    }

    user.verified = true;
    user.otp = null;
    user.otpExpire = null;

    await user.save();

    sendToken(res, user, 200, "Account verified successfully");
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const sendAgain = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user.otpExpire < Date.now()) {
      return res.status(200).json({
        success: false,
        message: "OTP expired",
      });
    }

    const otp = Math.floor(Math.random() * 10000);

    await sendMail(user.email, otp);

    user.otp = otp;
    user.otpExpire = Date.now() + 60 * 1000 * 5;

    await user.save();

    res.status(200).json({
      success: true,
      message: "OTP sent to your email",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    // console.log(req.body);
    let { email, password } = req.body;
    email = email.trim();

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter email and password",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      console.log("yahan error aa gaya");
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (!user.verified) {
      return res.status(200).json({
        success: false,
        message: "Please verify your account",
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    sendToken(res, user, 200, "Login successfull");
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
      })
      .json({
        success: true,
        message: "Logged out",
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

