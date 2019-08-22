const request = require('request');

var geocodeAddress = (address, callback) => {
    
    // Encoding the address component of the url
    var encodedAddress = encodeURIComponent(address);
    // Making a request to the location api
    request({
        url: `https://us1.locationiq.com/v1/search.php?key=079afe1fdbf725&q=${encodedAddress}&format=json`,
        json: true
    }, (error, response, body) => {
        // Not able to reach the server
        if (error) {
            callback('Unable to connect to the server');
        // Error 404
        } else if (body.error && body.error === 'Unable to geocode') {
            callback('Unable to find that address');
        }
        // Everything went well
        else if (response.statusCode === 200){
            callback(undefined, {
                address: body[0].display_name,
                latitude: body[0].lat,
                longitude: body[0].lon,
            });
        }
    });
};

module.exports = {
    geocodeAddress,
};