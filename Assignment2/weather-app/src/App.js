import React, { useState } from "react";
import "./App.css";
import { FaSun, FaCloud, FaCloudRain } from "react-icons/fa";
import axios from "axios";

function App() {
  const [city, setCity] = useState("New York");
  const [currentWeather, setCurrentWeather] = useState({
    temperature: 17,
    description: "Clear sky",
    icon: <FaSun className="text-yellow-500 text-6xl" />,
  });

  const forecast = [
    {
      day: "Wednesday",
      temp: 21,
      icon: <FaSun className="text-yellow-500 text-4xl" />,
    },
    {
      day: "Thursday",
      temp: 24,
      icon: <FaCloud className="text-gray-500 text-4xl" />,
    },
    {
      day: "Friday",
      temp: 21,
      icon: <FaSun className="text-yellow-500 text-4xl" />,
    },
    {
      day: "Saturday",
      temp: 24,
      icon: <FaCloud className="text-gray-500 text-4xl" />,
    },
  ];

  const handleSearch = async (e) => {
    const cityName = e.target.value;
    setCity(cityName);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=YOUR_API_KEY`
      );
      const weatherData = response.data;
      console.log(weatherData);
      setCurrentWeather({
        temperature: weatherData.main.temp,
        description: weatherData.weather[0].description,
        icon: <FaSun className="text-yellow-500 text-6xl" />, // Use conditions to change icons
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className="bg-blue-300 min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white bg-opacity-50 p-4 rounded-lg shadow-lg">
        <input
          type="text"
          placeholder="Enter a City..."
          value={city}
          onChange={handleSearch}
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none"
        />
        <div className="text-center mb-6">
          {currentWeather.icon}
          <h1 className="text-3xl font-bold">{city}</h1>
          <p className="text-xl">{currentWeather.temperature}°C</p>
          <p className="text-sm">{currentWeather.description}</p>
        </div>
        <div className="grid grid-cols-4 gap-2 text-center">
          {forecast.map((day, index) => (
            <div key={index} className="p-2 bg-white bg-opacity-70 rounded-lg">
              <p className="font-semibold">{day.day}</p>
              {day.icon}
              <p>{day.temp}°C</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
