import { Venue } from '../models/venues.js';

export const addVenue = async (req, res) => {
    try {
        const { name, location } = req.body;

        const newVenue = new Venue({
            name,
            location
        });

        await newVenue.save();
        res.status(201).json({
            success: true,
            message: 'Venue added successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error adding venue'
        });
    }
};
