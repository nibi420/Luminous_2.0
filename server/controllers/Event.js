import {Event} from '../models/events.js';
import {Venue} from '../models/venues.js';

export const addEvent = async (req, res) => {
    try {
        const { title, venueName, time, details, room } = req.body;

        // Find the venue with the given name in the venueSchema
        const venue = await Venue.findOne({ name: venueName });

        const newEvent = new Event({
            title,
            postedBy: req.user._id,
            venue: venue._id, // Set the venue ID instead of the name
            time,
            details,
            room
        });

        if (req.file) {
            // If a file was uploaded, add the file data to the event
            newEvent.picture = {
                data: req.file.buffer,
                contentType: req.file.mimetype
            }
        }

        await newEvent.save();
        res.status(201).json({
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
        const events = await Event.find()
            .populate('postedBy', 'username')
            .populate('venue', 'name');
        res.json(events);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};