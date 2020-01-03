const request = require('request');


const geoCode = (placeName, callback) =>{
    const geoCodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + placeName + '.json?access_token=pk.eyJ1IjoicHJlZXRsb3ZleiIsImEiOiJjazRwM2JybXYwOGowM2ZtdGhsazVxbnZ1In0.8ZIm9MfTFaU-eIZ6Y2iqhQ';

    request({ url: geoCodeUrl, json: true}, (error, response)=>{
            // console.log(response);
            if(error){
                    callback("Unable to connect", undefined);
            }
    
            else if(!response.body.features[0]){
                    callback("Unable to find location", undefined);    
            }
            else{
                const data = {
                     longitude : response.body.features[0].center[0],
                     latitude :  response.body.features[0].center[1],
                     location : response.body.features[0].place_name
                }    
     
                    callback(undefined, data);
             
            }  
            
           
           
     })
}

module.exports = geoCode;
