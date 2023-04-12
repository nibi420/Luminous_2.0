import mongoose from 'mongoose';

const venueSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
   
        coordinates: {
            type: [Number],
            required: true
        }
 
});

venueSchema.index({ location: '2dsphere' });

export const Venue = mongoose.model('Venue', venueSchema);


