import { Donation } from "../models/donation.js";
import { User } from "../models/users.js";
import { sendMail } from "../utils/sendMail.js";
import { sendToken } from "../utils/sendToken.js";



export const getDonationsData = async (req,res) => {
   
       const user = await Donation.find({  })
       return res.send(user)
       console.log(user)
   
  };

export const pushDonationsData = async (req,res) => {
    console.log(req.body)
   
    let don_case = await Donation.create(req.body);
  //  let a  = await Donation.deleteMany( { post_title: "third case" } )

    return res.send("done")
    console.log(user)

};