import {Event} from '../models/events.js';
import {Venue} from '../models/venues.js';
import cloudinary from "cloudinary";
import fs from "fs";


export const addEvent = async (req, res) => {
    try {
        const { title, venueName, time, details, room, categoryName} = req.body;
        const picture1 = req.files.picture.tempFilePath;
       
        var parsedtime = new Date(Date.parse(time));
    

        const venue = await Venue.findOne({ name: venueName });
        const category = categoryName;
    
        const result = await cloudinary.v2.uploader.upload(picture1, {
            folder: "luminous/events",
        });

        fs.rmSync("./tmp", { recursive: true });

        // console.log("Public id", result.public_id);
        // console.log("URL", result.secure_url);



        
        const newEvent = new Event({
            title,
            postedBy: req.user._id,
            venue: venue._id, // Set the venue ID instead of the name
            time: parsedtime,
            details,
            room,
            category,
            picture: {
                public_id: result.public_id,
                url: result.secure_url,
            }
        });

        console.log('hhere!!')

        // if (req.file) {
        //     // If a file was uploaded, add the file data to the event
        //     newEvent.picture = {
        //         data: req.file.buffer,
        //         contentType: req.file.mimetype
        //     }
        // }

        await newEvent.save();
        res.status(200).json({
            success: true,
            message: 'Event added successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error adding event'
        });
    }
};


export const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find({ })
            .populate('postedBy', 'username')
            .populate({path: 'venue', select:['name','coordinates']});
        res.json(events);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

export const getUpcomingEvent = async (req, res) => {
    try {
        const events = await Event.find({ time: { $gte: Date.now() } })
            .sort({ time: 1 })
            .populate('postedBy', 'username')
            .populate({ path: 'venue', select: ['name', 'coordinates'] })
            .limit(1);
        res.json(events);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};


export const removeEventAfterTime = async (req, res) => {
  try {
    const currentDate = new Date(); // Get the current date and time
    const eventsToDelete = await Event.find({ time: { $lt: currentDate } }).exec(); // Find events whose time is less than current date
    await Event.deleteMany({ _id: { $in: eventsToDelete.map(event => event._id) } }).exec(); // Delete events whose time has passed
    console.log(`Deleted ${eventsToDelete.length} expired events`);
  } catch (error) {
    console.error(`Error deleting expired events: ${error}`);
  }
}