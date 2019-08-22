const yargs = require('yargs');
const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');

const argv = yargs.options('a', {
    alias: 'address',
    demand: true,
    describe: 'Address to fetch weather for',
    string: true
}).help().argv;

// Getting the coordinates of the address
geocode.geocodeAddress(argv.a, (error, locationResult) => {
    if (error) {
        console.log(error);
    }
    else {
        console.log(locationResult.address);
        // Getting the informations about the weather of the address
        weather.getWeather(locationResult.latitude,locationResult.longitude, (error, weatherResult) => {
            if(error) {
                console.log(error);
            }
            else {
                console.log(`It's currently ${weatherResult.temperature}. It feels like ${weatherResult.apparentTemperature}`);
            }
        });
    }
});