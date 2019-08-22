const request = require('request');

var getWeather = (lat, lon, callback) => {
    // Making the request to the forecast api
    request({
        url: `https://api.darksky.net/forecast/44a15268178d76f66b71d9a1861b5cb8/${lat},${lon}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to forecast.io server');
        }
        else if(response.statusCode === 400) {
            callback('Unable to fetch weather');
        }
        else if(response.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature,
            });
        }
    });
}

module.exports = {
    getWeather,
}