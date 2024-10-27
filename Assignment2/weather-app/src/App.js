import React, { useState } from "react";
import {
  FaSun,
  FaCloudShowersHeavy,
  FaUmbrella,
  FaSnowflake,
} from "react-icons/fa";
import axios from "axios";

function App() {
  const [city, setCity] = useState("New York");
  const [currentWeather, setCurrentWeather] = useState({
    temperature: 17,
    description: "clear sky",
    icon: <FaSun className="text-yellow-500 text-7xl glowing-sun" />,
  });

  const [forecast, setForecast] = useState([]);

  const handleSearch = async (e) => {
    if (e.key === "Enter" || e.type === "click") {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=d46717fa2f228a7bd62d106fa4640ff4`
        );

        const weatherData = response.data.list;

        // Get current weather
        const currentWeatherData = weatherData[0];
        let weatherIcon = getWeatherIcon(currentWeatherData.weather[0].main);

        setCurrentWeather({
          temperature: currentWeatherData.main.temp,
          description: currentWeatherData.weather[0].description,
          icon: weatherIcon,
        });

        // Prepare forecast for the next 4 days
        const dailyForecast = [];
        for (let i = 0; i < 4; i++) {
          const dayForecast = weatherData[i * 8]; // Get the forecast for each day
          dailyForecast.push({
            day: new Date(dayForecast.dt * 1000).toLocaleString("en-US", {
              weekday: "long",
            }),
            temp: dayForecast.main.temp,
            icon: getWeatherIcon(dayForecast.weather[0].main),
          });
        }

        setForecast(dailyForecast);
      } catch (error) {
        console.error(
          "Error fetching weather data:",
          error.response ? error.response.data : error.message
        );
      }
    }
  };

  const getWeatherIcon = (weatherMain) => {
    switch (weatherMain) {
      case "Clear":
        return <FaSun className="text-yellow-500 text-5xl glowing-sun" />;
      case "Clouds":
        return <FaCloudShowersHeavy className="text-gray-400 text-5xl rainy" />;
      case "Rain":
        return <FaUmbrella className="text-blue-500 text-5xl rainy" />;
      case "Snow":
        return <FaSnowflake className="text-blue-300 text-5xl snowy" />;
      default:
        return <FaCloudShowersHeavy className="text-gray-400 text-5xl rainy" />;
    }
  };

  return (
    <div
      className="bg-blue-400 min-h-screen flex flex-col items-center justify-center p-4 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://wallpapers.com/images/high/clouds-4k-730etvicfwa10vb0.webp')",
      }}
    >
      <div className="w-full max-w-md bg-white bg-opacity-40 p-6 rounded-lg shadow-lg">
        <input
          type="text"
          placeholder="Enter a City..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleSearch}
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none text-center text-gray-700"
        />
        <div className="text-center mb-8">
          {currentWeather.icon}
          <h1 className="text-4xl font-bold text-gray-800 mt-2">{city}</h1>
          <p className="text-2xl text-gray-700">
            {currentWeather.temperature}°C
          </p>
          <p className="text-md text-gray-600 capitalize">
            {currentWeather.description}
          </p>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {forecast.map((day, index) => (
            <div
              key={index}
              className="p-2 bg-white bg-opacity-60 rounded-lg flex flex-col items-center"
            >
              <p className="font-medium text-gray-700">{day.day}</p>
              {day.icon}
              <p className="text-lg font-bold text-gray-800">{day.temp}°C</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
