import axios from "axios";

const api =  axios.create({
  baseURL: 'https://weather.indianapi.in',
  headers: { 'X-Api-Key': import.meta.env.VITE_WEATHER_API }
});

export async function getCities(){
    return await api.get('/india/cities');
}

export async function getCityWeather(city_id:String){
    return await api.get('/india/weather_by_id', { params: { city_id: city_id } })
}
