import { Venue } from '../models/venues.js';

export const addVenue = async (req, res) => {
    try {
        const { name, location } = req.body;

        // Check if a venue with the same name already exists
        const existingVenue = await Venue.findOne({ name });

        if (existingVenue) {
            // If a venue with the same name already exists, return an error
            return res.status(400).json({
                success: false,
                message: 'A venue with the same name already exists'
            });
        }

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