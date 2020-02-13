const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/e6e479343686a90ef4d581a16bbd9d44/' + latitude + ',' + longitude + '?lang=en&units=uk2'

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather service, please check your connection",undefined);
        } else if (body.error) {
            callback("Unable to find location, please try another search", undefined);
        } else {
           
            const currentTemp = body.currently.temperature;
            const rainChance = body.currently.precipProbability;
            callback(undefined, {
                weather: body.daily.data[0].summary + " Your current temperature is " + currentTemp + " degrees c with a " + (rainChance * 100) + "% chance of rain. The Moonphase is at " + body.daily.data[0].moonPhase + " and the Temperature High for the day is " + body.daily.data[0].temperatureHigh
            })
        }
    })
}

module.exports = forecast;


