const request = require('request')
const forecast = (latitude,longitude,callback) =>{

const url = 'http://api.weatherstack.com/current?access_key=e06473e6500c9f87a595f114ca37d62b&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)
request({ url:url, json:true}, (error,response) =>{

    if(error){

    
       callback('Unable to connect to weather service!',undefined)
    }else if(response.body.error){

       callback('Unable to find location', undefined)
    }else{

       callback(undefined,{
           placename : response.body.location,
           temperature :  response.body.current.weather_descriptions +  '.  Your current temperature is  ' + response.body.current.temperature+ ' degress. There is ' + response.body.current.feelslike + '  % ' + 'chance of rain'
          })
       }

  })


}

module.exports = forecast