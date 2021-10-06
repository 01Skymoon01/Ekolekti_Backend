
import Trolley from '../models/trolleyModel.js';


// @desc    Change Position Trolley
export let changePositionTrolley=  (row) => {

    try {
        //console.log("messageGPS: ", row )
        const trolleyMessages =   Trolley.findByIdAndUpdate(row.messageGPS.idTrolley, {latitude: row.messageGPS.position.latitude, longitude: row.messageGPS.position.longitude });

        return trolleyMessages;
    } catch (error) {
        return error.message;
    }

};
