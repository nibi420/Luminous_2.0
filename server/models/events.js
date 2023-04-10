import mongoose from "mongoose";

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
    details: {
        type: String,
        required: true
    },
    picture: {
        public_id: String,
        url: String,
        data: Buffer,
        contentType: String
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