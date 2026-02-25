import axios from "axios";

const api =  axios.create({
  baseURL: 'https://weather.indianapi.in',
  headers: { 'X-Api-Key': import.meta.env.VITE_WEATHER_API }
});

export async function getCities(){
    return await api.get('/india/cities');
}

export async function getCityWeather(){//city_id:String){
    // The indian api is not working 
    const sample = {
  "city": "Chennai-nungambakkam",
  "weather": {
    "current": {
      "humidity": {
        "evening": 81,
        "morning": 76
      },
      "rainfall": null,
      "temperature": {
        "max": {
          "value": 32.8,
          "departure": -1.5
        },
        "min": {
          "value": 27.6,
          "departure": 1.7
        }
      }
    },
    "forecast": [
      {
        "date": "08-Sep-2024",
        "max_temp": 33,
        "min_temp": 28,
        "description": "Generally cloudy sky with moderate rain"
      },
      {
        "date": "09-Sep-2024",
        "max_temp": 34,
        "min_temp": 28,
        "description": "Generally cloudy sky with Light rain"
      },
      {
        "date": "10-Sep-2024",
        "max_temp": 34,
        "min_temp": 28,
        "description": "Generally cloudy sky with Light rain"
      },
      {
        "date": "11-Sep-2024",
        "max_temp": 34,
        "min_temp": 28,
        "description": "Generally cloudy sky with Light rain"
      },
      {
        "date": "12-Sep-2024",
        "max_temp": 34,
        "min_temp": 28,
        "description": "Generally cloudy sky with Light rain"
      },
      {
        "date": "13-Sep-2024",
        "max_temp": 34,
        "min_temp": 28,
        "description": "Rain"
      },
      {
        "date": "14-Sep-2024",
        "max_temp": 34,
        "min_temp": 28,
        "description": "Rain"
      }
    ],
    "astronomical": {
      "sunset": "18:15",
      "moonset": "21:30",
      "sunrise": "05:58",
      "moonrise": "09:47"
    }
  }
}
   //await api.get('/india/weather_by_id', { params: { city_id: city_id } });
   return {data:sample};
}
