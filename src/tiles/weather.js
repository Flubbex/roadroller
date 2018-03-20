import React,{Fragment} from 'react'
import axios from 'axios'
import {Tile} from '../component/tileset';

const source = 'http://api.openweathermap.org/data/2.5/weather';

class WeatherTile extends Tile {
  create(props){
    var self = this;

    if (!props || !props.location || !props.appid)
      return {
        title: "Weather",
        content: <div>Error: Missing location or appid</div>
      }

    axios.get(source, {
      params:{
        q: props.location,
        appid: props.appid,
        units:props.units||"metric"
      }
    })
    .then(function (response) {

      const weather = {
        location: response.data.name,
        temperature:response.data.main.temp,
        min:response.data.main.temp_min,
        max:response.data.main.temp_max,
        humidity:response.data.main.humidity,
        current:response.data.weather &&
                response.data.weather.length > 0
                ? response.data.weather[0].description
                : "No current weather status"
      };

      self.setState({
        content:(<Fragment>
              <p>Location: {weather.location}</p>
              <p>Now: °{props.units==="imperial"?'F':'C'} {weather.temperature}</p>
              <p>All day: Between {weather.min} and {weather.max}</p>
              <p>Humidity: {weather.humidity}</p>
              <p>State: {weather.current}</p>

            </Fragment>)
      })

    })
    .catch(function (error) {
      console.log(error);
    });

    return {
      title: "Weather",
      content: <div>Loading weather info..</div>,
      weatherdata: null
    }

  }
}
export default WeatherTile
