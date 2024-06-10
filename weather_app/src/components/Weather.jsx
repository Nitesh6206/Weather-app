import React, { useState } from 'react'

const apiKey = 'd12e05b15723bcad2d2ec2faa6beceda';

const Weather = () => {
    const [locations, setLocations] = useState([]);
    const [newLocation, setNewLocation] = useState('');
    const [error, setError] = useState(null);

    const fetchWeather = async (location) => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`
            );
            if (!response.ok) {
                throw new Error('City not found or API request failed');
            }
            const data = await response.json();
            return data;
        } catch (err) {
            setError(err.message);
            return null;
        }
    };

    const handleAddLocation = async () => {
        if (!newLocation) return;
        const data = await fetchWeather(newLocation);
        if (data) {
            setLocations([...locations, { name: data.name, weatherData: data }]);
            setNewLocation('');
            setError(null);
        }
    };

    const handleRemoveLocation = (index) => {
        const updatedLocations = [...locations];
        updatedLocations.splice(index, 1);
        setLocations(updatedLocations);
    };

    return (
        <div className="flex flex-col">
            <div className=" flex justify-center gap-3 mt-4">
                <input
                    type="text"
                    placeholder="Enter city name"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="h-[6vh] w-[18vw] rounded-md text-center border-zinc-400 border-2"
                />
                <button onClick={handleAddLocation} className='py-3 px-3 bg-blue-600 text-[#fff] h-[6vh] rounded-md'><p className='bg-transparent text-[0.8rem] font-semibold'>Add Location</p></button>
            </div>

            {error && <p className="error">{error}</p>}

            {locations.map((location, index) => (
                <div key={index} className=" flex flex-wrap justify-between items-center w-[100%] py-3 mt-3 px-4 gap-3">
                    <div className='flex justify-between  items-center bg-white border-zinc-400 border-2 p-3 h-[6vh] text-base rounded-md gap-#'>
                        <h2>{location.name}</h2>
                        <p>Temperature: {Math.round((location.weatherData.main.temp) - 273.15)} °C</p>
                        <p>Humidity: {location.weatherData.main.humidity} %</p>
                        <p>Wind Speed: {location.weatherData.wind.speed} m/s</p>
                        <p>Weather: {location.weatherData.weather[0].description}</p>
                    </div>
                    <button onClick={() => handleRemoveLocation(index)} className=' py-3 px-3 bg-blue-600 text-[#fff] h-[6vh] rounded-md flex justify-center items-center'><p className='bg-transparent text-center'>Remove</p></button>
                </div>
            ))}
        </div>
    )
}

export default Weather