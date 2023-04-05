import { Map_Schema } from "../models/map_loc.js";


export const addlocation =  async( req, res) => {

    try{
        const { locationName, coordinates } = req.body;

        let location = await Map_Schema.create({
            locationName,
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

