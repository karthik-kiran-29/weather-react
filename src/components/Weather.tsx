import React, { useEffect, useState } from 'react'
import { getCityWeather } from '../api';

interface WeatherProps {
    cityId: string;
}

export default function Weather({ cityId }: WeatherProps) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [weather,setWeather] = useState<Object>({});
    useEffect(() => {
        const fetchWeather = async () => {
          try {
            const response = await getCityWeather(cityId);
            setWeather(response.data);
          } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
          } finally {
            setLoading(false);
          }
        };
    
        fetchWeather();
      }, []);

    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>Error: {error}</h1>;

    return (
        <div>
            {}
        </div>
    )
}
