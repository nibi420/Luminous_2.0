import { DonationCategories } from "../models/categories.js";
import { Donation } from "../models/donation.js";
import cloudinary from "cloudinary";
import { User } from "../models/users.js";
import { sendMail } from "../utils/sendMail.js";
import { sendToken } from "../utils/sendToken.js";
import fs from "fs";

export const getDonationsData = async (req, res) => {
  try {
    const user = await Donation.find({});
    return res.send(user);
    console.log(user);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const pushDonationsData = async (req, res) => {
  try {
    let {
      category,
      post_title,
      description,
      required,
      collected,
      deadline,
      acc_name,
      acc_num,
      bank_name,
      iban,
      image,
    } = req.body;

    const avatar = req.files.image.tempFilePath;

    var parsedDeadline = new Date(Date.parse(deadline));
    // console.log(parsedDeadline)

    //  let a  = await Donation.deleteMany( req.body )
    const result = await cloudinary.v2.uploader.upload(avatar, {
      folder: "luminous/donations",
    });

    fs.rmSync("./tmp", { recursive: true });

    let body = {
      category,
      post_title,
      required,
      collected,
      deadline: parsedDeadline,
      acc_name,
      acc_num,
      bank_name,
      iban,
      picture: {
        public_id: result.public_id,
        url: result.secure_url,
      },
      description,
    };
    let don_case = await Donation.create(body);
    return res.send("done");
  } catch (error) {
    console.log(error)
    res.status(500).json({
     
      success: false,
      message: error.message,
    });
  }
};

export const getDonCats = async (req, res) => {
  try {
    console.log(req.body);
    const user = await DonationCategories.find(req.body);
    return res.send(user);
  } catch (error) {
    console.log(error);
  }
};

export const pushDonCats = async (req, res) => {
  try {
    const user = await DonationCategories.create(req.body);
    // const user = await DonationCategories.deleteMany(req.body)
    return res.send("done");
  } catch (error) {
    console.log(error);
  }
};
