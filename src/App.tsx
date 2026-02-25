import { useEffect, useState } from "react";
import { getCities } from "./api";
import { Weather } from "./components/Weather";

export default function App() {
  const [cityId, setCityId] = useState<string>("");
  const [cities, setCities] = useState<Record<string, string>>({});
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

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans text-gray-900">
      <div className="max-w-4xl mx-auto">
        
        {/* City Selection Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-200">
          <label htmlFor="city-select" className="text-lg font-medium text-gray-700 whitespace-nowrap">
            Select City:
          </label>
          
          {loading ? (
            <span className="text-gray-500">Loading cities...</span>
          ) : error ? (
            <span className="text-red-500">Failed to load cities.</span>
          ) : (
            <select 
              id="city-select"
              value={cityId} 
              onChange={(e) => setCityId(e.target.value)}
              className="flex-1 w-full sm:max-w-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none"
            >
              <option value="" disabled>-- Choose a location --</option>
              {Object.entries(cities).map(([key, value]) => (
                <option value={key} key={key}>{value}</option>
              ))}
            </select>
          )}
        </div>

        {/* Weather Content Area */}
        {cityId.length === 0 ? (
          <div className="mt-12 text-center text-gray-400">
            <div className="text-5xl mb-4">📍</div>
            <p className="text-lg">Select a city from the dropdown to view the weather forecast.</p>
          </div>
        ) : (
          <Weather cityId={cityId} />
        )}
        
      </div>
    </div>
  );
}