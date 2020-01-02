const request = require('request');
const forecast = (longitude, latitude, callback)=>{

    const url = 'https://api.darksky.net/forecast/244a4c334ba0449107f5c38b1b1de303/' + longitude +','+ latitude +'?units=si';

    request({ url: url, json: true}, (error, response)=>{
 
    if(error){
            callback("Unable to connect", undefined);
    }

    else if(response.body.error){
            callback(response.body.error, undefined);    
    }
    else{
            callback(undefined, 
                    response.body.daily.data[0].summary + 'It is currently' +response.body.currently.temperature);
    }
    
    })

}

module.exports = forecast;