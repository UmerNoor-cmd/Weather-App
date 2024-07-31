import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Search from "./components/search/search";
import CurrentWeather from "./components/weather/current-weather";
import "./App.css";

function App() {
    const [weather, setWeather] = useState({
        city: null,
        country: null,
        temperature: null,
        feelsLike: null,
        humidity: null,
    });

    const handleOnSearchChange = (searchData) => {
        console.log(searchData);
        const [lat, lon] = searchData.value.split(" ");
        const [city, state, country] = searchData.label.split(", "); // Correctly assign these variables

        const weatherAPIKey = "ce42d91e0b3aebf48cfac26838aecb1f";
        const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherAPIKey}`;

        fetch(apiURL)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                // Log data immediately after fetching, before setting it into the state
                console.log(`Temperature: ${data.main.temp} K`);
                console.log(`Feels like: ${data.main.feels_like} K`);
                console.log(`Humidity: ${data.main.humidity}%`);

                // Update state with new data
                setWeather({
                    city: city,
                    country: country,
                    temperature: data.main.temp,
                    feelsLike: Math.round(data.main.feels_like),
                    humidity: data.main.humidity,
                });
            })
            .catch((error) => {
                console.error(
                    "There has been a problem with your fetch operation:",
                    error
                );
            });
    };

    return (
        <div className="container">
            <Search onSearchChange={handleOnSearchChange} />
            <CurrentWeather data={weather} />
        </div>
    );
}

export default App;
