import { DonationCategories } from "../models/categories.js";
import { Donation } from "../models/donation.js";
import { User } from "../models/users.js";
import { sendMail } from "../utils/sendMail.js";
import { sendToken } from "../utils/sendToken.js";



export const getDonationsData = async (req,res) => {
   
  const user = await Donation.find({ deadline: { $gte: Date.now() }})
       return res.send(user)
       console.log(user)
   
  };

export const getDonationLatest = async (req, res) => {
  const user = await Donation.find({ deadline: { $gte: Date.now() } })
    .sort({ deadline: 1 })
    .limit(1);
  console.log(user)
  return res.send(user)
  console.log(user)

};
export const pushDonationsData = async (req,res) => {
    // console.log(req.body)
   
    let don_case = await Donation.create(req.body);
  //  let a  = await Donation.deleteMany( req.body )

    return res.send("done")
    console.log(user)

};


export const getDonCats = async (req,res) => {
  try{
    console.log(req.body)
    const user = await DonationCategories.find(req.body)
    return res.send(user)

  }
  catch(error){
    console.log(error)
  }
 

};

export const pushDonCats = async (req,res) => {
  try{
   
    const user = await DonationCategories.create(req.body)
    // const user = await DonationCategories.deleteMany(req.body)
    return res.send("done")

  }
  catch(error){
    console.log(error)
  }
 
};

export const pledge = async (req, res) => {

try{
  



}

catch(error){
  console.log(error)

}

};