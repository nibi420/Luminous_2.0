import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({

    category : {
        type: String,
        required: true,
      },

    post_title : {
        type: String,
        required: true,
      },

    image : {
        public_id: String,
        url: String,
      },

    required : {
        type: Number,
        required: true,
      },
    collected: {
      default:0,
      type: Number,
      required: true,
    },

    deadline: {
        type: Date,
        required: true,
        default: Date.now() + (7 * 24*60*60 * 1000)
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
    },
    picture: {
      public_id: String,
      url: String,
      data: Buffer,
      contentType: String
  },
  description: {
    type: String,

    },
  });

  export const Donation = mongoose.model("Donation", donationSchema);