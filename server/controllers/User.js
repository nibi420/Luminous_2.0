import { User } from "../models/users.js";
import { sendMail } from "../utils/sendMail.js";
import { sendToken } from "../utils/sendToken.js";
import cloudinary from "cloudinary";
import fs from "fs";

export const register = async (req, res) => {
  try {
    console.log("Register");
    let { fullname, email, username, password } = req.body;
    email = email.trim();
    const regex = /^[0-9]+$/;
    let domain = email.split("@")[1];
    let roleCheck = email.split("@")[0];
    let role;

    if (!fullname || !email || !username || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all fields",
      });
    }
    if (domain !== "lums.edu.pk") {
      res.status(400).json({
        success: false,
        message: "Please enter a valid LUMS email ID",
      });
    }

    if (email === "studentcouncil@lums.edu.pk") {
      role = "stuco";
    } else {
      if (regex.test(roleCheck)) {
        role = "student";
      } else {
        role = "admin";
      }
    }

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
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const verify = async (req, res) => {
  try {
    console.log("Verification");
    const otp = Number(req.body.otp);

    const user = await User.findById(req.user._id);

    if (user.otp !== otp || user.otpExpire < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP or OTP expired",
      });
    }

    user.verified = true;
    user.otp = null;
    user.otpExpire = null;

    await user.save();

    logout(req, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const sendAgain = async (req, res) => {
  try {
    console.log("Send Again");
    const user = await User.findById(req.user._id);

    if (user.otpExpire < Date.now()) {
      return res.status(400).json({
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

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const otp = Math.floor(Math.random() * 10000);

    await sendMail(email, otp);

    user.resetPasswordOtp = otp;
    user.resetPasswordOtpExpire = Date.now() + 60 * 1000 * 5;

    await user.save();

    sendToken(res, user, 200, "OTP sent to your email");
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { otp } = req.body;

    const user = await User.findById(req.user._id);

    if (
      user.resetPasswordOtp !== otp ||
      user.resetPasswordOtpExpire < Date.now()
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP or OTP expired",
      });
    }

    user.resetPasswordOtp = null;
    user.resetPasswordOtpExpire = null;

    await user.save();
    res.status(200).json({
      success: true,
      message: "OTP verified",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const settingPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;

    if (!newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please enter password",
      });
    }

    const user = await User.findById(req.user._id);

    user.password = newPassword;

    await user.save();

    logout(req, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    console.log("Login");
    // console.log(req.body);
    let { email, password } = req.body;
    email = email.trim();

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter email and password",
      });
    }

    // console.log("Abhi tak theek");
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      // console.log("yahan error aa gaya");
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (!user.verified) {
      return res.status(400).json({
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

    console.log("Sending token");
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
    console.log("Logout");
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

export const changePassword = async (req, res) => {
  try {
    console.log("Change password");
    const user = await User.findById(req.user._id).select("+password");

    const isMatch = await user.comparePassword(req.body.oldPassword);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    user.password = req.body.newPassword;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });

    // sendToken(res, user, 200, "Password changed successfully");
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    console.log("Get profile");
    const user = await User.findById(req.user._id);

    res.status(200).json({
      success: true,
      user: {
        fullname: user.fullname,
        email: user.email,
        username: user.username,
        role: user.role,
        profile_picture: user.profile_picture,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const uploadPicture = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const avatar = req.files.avatar.tempFilePath;

    if (avatar) {
      if (user.profile_picture.url !== "") {
        await cloudinary.v2.uploader.destroy(user.profile_picture.public_id);
      }

      const result = await cloudinary.v2.uploader.upload(avatar, {
        folder: "luminous/profile_pictures",
      });

      fs.rmSync("./tmp", { recursive: true });

      console.log("Public id", result.public_id);
      console.log("URL", result.secure_url);

      user.profile_picture = {
        public_id: result.public_id,
        url: result.secure_url,
      };

      await user.save();
      console.log("User saved");

      res
        .status(200)
        .json({ success: true, message: "Profile Updated successfully" });
    }
  } catch (error) {
    console.log("Error idher hai", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
