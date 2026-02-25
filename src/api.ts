import axios from "axios";

const api =  axios.create({
  baseURL: 'https://weather.indianapi.in',
  headers: { 'X-Api-Key': 'sk-live-MqSfVdzG8yXii6t2evey71KoZSmzlVXJ8xaCrSgn' }
});

export async function getCities(){
    return await api.get('/india/cities');
}
