const request = require('request')

const forecast = (latitude,longitude,callback) => {
  const url=`http://api.weatherstack.com/current?access_key=b6f1fcc7f118f474a889ce25afcc2c5c&query=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}`
  request({url:url,json:true},(error,response) => {
    if(error){
      callback('Unable to connect wheather server',undefined)
    }else if(response.body.error){
      callback('Unable to found location',undefined)
    }else{
      callback(undefined,`Tt is currently ${response.body.current.temperature} dCelsius out. Wind speed is ${response.body.current.wind_speed}`)
    }
  })

}

module.exports = forecast