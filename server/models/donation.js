import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
    donation_id: {
      type: String,
      required: true,
    },

    donation_category_id: {
        type: String,
        required: true,
      },

    post_title : {
        type: String,
        required: true,
      },

    image : {
        type: String,
        required: true,
      },

    required : {
        type: String,
        required: true,
      },
    collected: {
      type: String,
      required: true,
    },

    deadline: {
        type: Date,
        required: true,
        },

    acc_name: {
    type: String,
    required: true,
    },

    acc_num: {
    type: String,
    required: true,
    },

    bank_name: {
        type: String,
        required: true,
        },

    iban:{
        type: String,
        required: true
    }
  });

  export const Donation = mongoose.model("Donation", donationSchema);