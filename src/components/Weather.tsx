import React, { useEffect, useState } from 'react';
import { getCities, getCityWeather } from '../api';


// --- Types based on API output ---
interface ForecastDay {
  date: string;
  max_temp: number;
  min_temp: number;
  description: string;
}

interface WeatherData {
  city: string;
  weather: {
    current: {
      humidity: { evening: number; morning: number };
      rainfall: null | number;
      temperature: {
        max: { value: number; departure: number };
        min: { value: number; departure: number };
      };
    };
    forecast: ForecastDay[];
    astronomical: {
      sunset: string;
      moonset: string;
      sunrise: string;
      moonrise: string;
    };
  };
}

interface WeatherProps {
  cityId: string;
}



// --- Weather Component ---
export function Weather({ cityId }: WeatherProps) {
    
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const response = await getCityWeather(cityId);
        setData(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (cityId) {
      fetchWeather();
    }
  }, [cityId]); // Added cityId to dependency array

  if (loading) return <div className="text-gray-500 mt-4 animate-pulse">Loading weather data...</div>;
  if (error) return <div className="text-red-500 mt-4">Error: {error}</div>;
  if (!data) return null;

  const current = data.weather.current;
  const astro = data.weather.astronomical;

  return (
    <div className="flex flex-col gap-6 mt-6 w-full max-w-4xl">
      {/* Top Section: Two Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: Main Weather Overview (Left in wireframe) */}
        <div className="bg-blue-50 border border-blue-100 p-8 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm">
          <div className="text-6xl mb-4">
            {/* Simple condition for emoji based on first forecast day, you can replace with real icons */}
            {data.weather.forecast[0]?.description.toLowerCase().includes('rain') ? '🌧️' : '⛅'}
          </div>
          <h2 className="text-2xl font-bold text-gray-800 capitalize">
            {data.city.split('-').join(', ')}
          </h2>
          <div className="text-4xl font-extrabold text-blue-600 mt-2">
            {current.temperature.max.value}°C
          </div>
          <p className="text-gray-500 mt-1 capitalize">{data.weather.forecast[0]?.description}</p>
        </div>

        {/* Card 2: Weather Details (Right in wireframe) */}
        <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm flex flex-col justify-center gap-4">
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Current Details</h3>
          
          <div className="flex justify-between text-gray-600">
            <span>Morning Humidity:</span>
            <span className="font-medium text-gray-900">{current.humidity.morning}%</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Evening Humidity:</span>
            <span className="font-medium text-gray-900">{current.humidity.evening}%</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Min Temperature:</span>
            <span className="font-medium text-gray-900">{current.temperature.min.value}°C</span>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <span className="block text-xs text-gray-500 uppercase tracking-wider">Sunrise</span>
              <span className="font-semibold">{astro.sunrise}</span>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <span className="block text-xs text-gray-500 uppercase tracking-wider">Sunset</span>
              <span className="font-semibold">{astro.sunset}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Forecast Row (Bottom boxes in wireframe) */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">7-Day Forecast</h3>
        <div className="flex overflow-x-auto gap-4 pb-4 snap-x">
          {data.weather.forecast.map((day, index) => (
            <div 
              key={index} 
              className="min-w-[140px] bg-white border border-gray-200 p-4 rounded-xl shadow-sm flex flex-col items-center shrink-0 snap-start"
            >
              <div className="text-sm font-medium text-gray-500 mb-2">
                {/* Formats "08-Sep-2024" to a shorter version if needed, or keeps as is */}
                {day.date.slice(0, 6)}
              </div>
              <div className="text-2xl mb-2">
                 {day.description.toLowerCase().includes('rain') ? '🌧️' : '☁️'}
              </div>
              <div className="flex gap-2 text-sm">
                <span className="font-bold text-gray-800">{day.max_temp}°</span>
                <span className="text-gray-400">{day.min_temp}°</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
