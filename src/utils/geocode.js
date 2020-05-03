const request = require('request') 

geocode = (address,callback) =>{
    const url =  'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiaXRzY2hhcmFucCIsImEiOiJjazlwYmt3Mm4wOHpzM2dxaHJua2MxODR2In0.HUN3KQwl_vT7CnQhOudvYg'
     request({url:url,json:true},(error,response) => {
          if(error)
          {
              callback('unable to connect to location services !',undefined)
          }
          else if(response.body.features.length === 0)
          {
              callback('unable to find location !',undefined)
          }
          else
          {
              callback(undefined,
                {
                  latitude: response.body.features[0].center[1],
                  longtitude: response.body.features[0].center[0],
                  location: response.body.features[0].place_name
              })
          }
     })
  }

  module.exports = geocode