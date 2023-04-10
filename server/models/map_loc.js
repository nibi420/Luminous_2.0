import mongoose from "mongoose";


const mapSchema = new mongoose.Schema({
  locationName: {
    type: String,
    required: [true],
  },

  coordinates: {
    type: [Number],
    required: [true],
  },
 

  
});


mapSchema.pre("save", async function (next) {
    
    next();
  });


export const Venue2 = mongoose.model("Venue2", mapSchema);