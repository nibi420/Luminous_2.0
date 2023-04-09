import mongoose from "mongoose";

const donationCat = new mongoose.Schema({
    type:{
        type: String,
      required: true,

    },
    name : {
      type: String,
      required: true,
    }

  });

export const DonationCategories = mongoose.model("DonationCategories", donationCat);