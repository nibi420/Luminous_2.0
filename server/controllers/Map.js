// import { Venue } from "../models/map_loc.js";
import { Venue } from "../models/venues.js";
import {Event} from '../models/events.js';


export const addlocation =  async( req, res) => {

    try{
        const { name, coordinates } = req.body;

        let location = await Venue.create({
            name,
            coordinates,
          });

        res.json({
            success: true,
            message: " Location added to Database",
        });


    }
    catch(error){
        res.status(600).json({
            success: false,
            message: error.message,
          });

    }

}



export const todaysEvents = async( req, res) => {  

    try{
        // Formatting DATE
        const date = new Date();
        const formatData = (input) => {
            if (input > 9) {
              return input;
            } else return `0${input}`;
          };
        const format = {
            dd: formatData(date.getDate()),
            mm: formatData(date.getMonth() + 1),
            yyyy: date.getFullYear()};
        const d2 = formatData(date.getDate() + 1);

        const todaysDate =`${format.yyyy}-${format.mm}-${format.dd}`;
        const tommDate = `${format.yyyy}-${format.mm}-${d2}`;

        // Formatting Date DONE

        const todaysEvents = await Event.find({
            time: { $gte: todaysDate, $lte: tommDate },
          })
        .populate({ path:"postedBy" , select:["fullname"] })
        .populate({path: "venue", select:["name", "coordinates"]});


        res.json({
            success: true,
            message:"data: contains todays events",
            data: todaysEvents,
        });
        



    }catch(error){
        console.log(error);
        res.status(250).json({
            success: false,
            message: error.message,
          });   
    }

}



export const nextThreeDays = async( req, res) => {  

    try{
        // Formatting DATE
        const date = new Date();
        const formatData = (input) => {
            if (input > 9) {
              return input;
            } else return `0${input}`;
          };
        const format = {
            dd: formatData(date.getDate()),
            mm: formatData(date.getMonth() + 1),
            yyyy: date.getFullYear()};
        const d2 = formatData(date.getDate() + 3);

        const todaysDate =`${format.yyyy}-${format.mm}-${format.dd}`;
        const tommDate = `${format.yyyy}-${format.mm}-${d2}`;

        // Formatting Date DONE

        const todaysEvents = await Event.find({
            time: { $gte: todaysDate, $lte: tommDate },
          })
        .populate({ path:"postedBy" , select:["fullname"] })
        .populate({path: "venue", select:["name", "coordinates"]});


        res.json({
            success: true,
            message:"data: contains events data within next three days",
            data: todaysEvents,
        });
        



    }catch(error){
        console.log(error);
        res.status(250).json({
            success: false,
            message: error.message,
          });   
    }

}


export const nextSevenDays = async( req, res) => {  

    try{
        // Formatting DATE
        const date = new Date();
        const formatData = (input) => {
            if (input > 9) {
              return input;
            } else return `0${input}`;
          };
        const format = {
            dd: formatData(date.getDate()),
            mm: formatData(date.getMonth() + 1),
            yyyy: date.getFullYear()};
        const d2 = formatData(date.getDate() + 7);

        const todaysDate =`${format.yyyy}-${format.mm}-${format.dd}`;
        const tommDate = `${format.yyyy}-${format.mm}-${d2}`;

        // Formatting Date DONE

        const todaysEvents = await Event.find({
            time: { $gte: todaysDate, $lte: tommDate },
          })
        .populate({ path:"postedBy" , select:["fullname"] })
        .populate({path: "venue", select:["name", "coordinates"]});


        res.json({
            success: true,
            message:"data: contains events data within next seven days",
            data: todaysEvents,
        });
        



    }catch(error){
        console.log(error);
        res.status(250).json({
            success: false,
            message: error.message,
          });   
    }

}

export const allDays = async( req, res) => {  

  try{
    
      const todaysEvents = await Event.find()
      .populate({ path:"postedBy" , select:["fullname"] })
      .populate({path: "venue", select:["name", "coordinates"]});

      res.json({
          success: true,
          message:"data: contains events data of all days",
          data: todaysEvents,
      });
      



  }catch(error){
      console.log(error);
      res.status(250).json({
          success: false,
          message: error.message,
        });   
  }

}



