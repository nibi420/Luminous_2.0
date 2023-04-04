import Event from '../models/events.js';

export const addEvent = async (req, res) => {
    try {
        const { title, postedBy, venue, time, details, room } = req.body;

        const newEvent = new Event({
            title,
            postedBy,
            venue,
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
