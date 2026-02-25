import type { AxiosResponse } from "axios";
import { getCities, getCityWeather } from "./api"
import { useEffect, useState } from "react";

function App() {
  const [cityId,SetCityId] = useState<string>("");
  const [cities, setCities] = useState<Record<string, string>>({});
  const [weatherData,setWeatherData] = useState<Object>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await getCities();
        setCities(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error}</h1>;


  return (
    <div>
      <div>
        <div>Select Your City:
        <select value={cityId} onChange={(e)=>{SetCityId(e.target.value)}}>
          {Object.entries(cities).map(([key, value]) => (
            <option value={key} key={key}>{value}</option>
          ))}
        </select>
      </div>
      <button onClick={()=> {console.log(cityId)}}>Submit</button>
      </div>
      <div>
          {(cityId.length==0)?<div>Enter the data to view City</div>:<div>data</div> }
      </div>
    </div>
  )
}

export default App

