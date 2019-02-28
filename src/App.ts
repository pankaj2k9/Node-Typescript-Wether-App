import express from 'express'
import data from './location.json'
import request from "request-promise-native"
import "isomorphic-fetch"
import geoTz from "geo-tz"
import moment from "moment-timezone"



class App {
  public express
  public lat
  public long
  public weather:any[]
  
  constructor () {
    this.express = express()
    this.getAllLocation()
  }

  public getAllLocation(): void{
    data.data.forEach(element => {
      this.getLongLat(element.Location, element.Zip)    
    });
    
  }

  private async getLongLat(location, zip): Promise<void>{
    let url = `http://www.mapquestapi.com/geocoding/v1/address?key=va3ysZGxwJfUKGxkqXqt7BA4jOZHA1DM&location=${location},${zip}`
    let coords = await fetch(url).then((response) => response.json())
    coords = coords.results[0].locations[0].latLng
    this.lat = parseFloat(coords.lat)
    this.long = parseFloat(coords.lng)
    let weatherURL = `http://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.long}&units=imperial&APPID=408ffed288f8e91bea28487e9922399b`
    let timeZoneByLocation = geoTz(this.lat, this.long)[0]
    let currentTime = moment().tz(timeZoneByLocation).format('ha z')
    this.locationToWeather(weatherURL, currentTime)
  }

  private async locationToWeather(url, currentTime): Promise<void> {
    let result = await request.get(url)
    result = JSON.parse(result)
    let wetherResult = { ...result, currentTime }
    console.log(wetherResult)
  }
}

export default new App().express
