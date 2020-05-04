const request = require('request')

const forecast = (latitude, longitude, callback) => {
    console.log(latitude,longitude)
    const key='0b278e2d93402cbd892e649c93c10ff0'
    const url ='http://api.openweathermap.org/data/2.5/weather?lat='+encodeURIComponent(latitude)+'&lon='+encodeURIComponent(longitude)+'&appid='+encodeURIComponent(key)

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.message) {
            callback('Unable to find location', undefined)
        } else {
            temps = body.main.temp-273
            callback(undefined," Weather seems "+body.weather[0].description+" and temperature is "+temps.toFixed(2)+"˚C in "+body.name)
        }
    })
}

module.exports = forecast