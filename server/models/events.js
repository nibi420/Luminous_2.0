import mongoose from "mongoose";

import cron from 'node-cron';

// Run the task every day at 12:20 AM
cron.schedule('0 0 * * *', async () => {
    const now = new Date();
    // Find all events whose endTime is less than the current date
    const expiredEvents = await Event.find({
        $or: [
            { endTime: { $lt: now } },
            { endTime: { $exists: false } },
        ],
    });
    console.log(expiredEvents);
    // Delete each expired event
    for (const event of expiredEvents) {
        await Event.findByIdAndDelete(event._id);
    }
});


const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    venue: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Venue',
        required: true
    },
    time: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    picture: {
        public_id: String,
        url: String,
    },
    room: {
        type: String,
        default: ''
    },
    category: {
        type: String,
        required: true,
    },

});

export const Event = mongoose.model('Event', eventSchema); 