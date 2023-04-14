import { DonationCategories } from "../models/categories.js";
import { Donation } from "../models/donation.js";
import { User } from "../models/users.js";
import { sendMail } from "../utils/sendMail.js";
import { sendToken } from "../utils/sendToken.js";
import cloudinary from "cloudinary"
import fs from "fs"



export const getDonationsData = async (req, res) => {

  const user = await Donation.find({})
  return res.send(user)
  console.log(user)

};

export const pushDonationsData = async (req, res) => {
  // console.log(req.body)

  const { category, post_title, required, collected, deadline, acc_name, acc_num, bank_name, iban } = req.body;
  const image = req.files.avatar.tempFilePath;

  let don_case = await Donation.create(req.body);
  //  let a  = await Donation.deleteMany( req.body )

  return res.send("done")
  console.log(user)

};


export const getDonCats = async (req, res) => {
  try {
    console.log(req.body)
    const user = await DonationCategories.find(req.body)
    return res.send(user)

  }
  catch (error) {
    console.log(error)
  }


};

export const pushDonCats = async (req, res) => {
  try {

    const user = await DonationCategories.create(req.body)
    // const user = await DonationCategories.deleteMany(req.body)
    return res.send("done")

  }
  catch (error) {
    console.log(error)
  }

};


export const uploadPicture = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const picture = req.files.picture.tempFilePath;

    if (picture) {
      if (user.profile_picture.url !== "") {
        await cloudinary.v2.uploader.destroy(user.profile_picture.public_id);
      }

      const result = await cloudinary.v2.uploader.upload(avatar, {
        folder: "luminous/donations",
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
