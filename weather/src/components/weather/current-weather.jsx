import "./current-weather.css";

const CurrentWeather = ({data}) => {

    const celcius = Math.round(data.temperature - 273.15);
    const fahrenheit = Math.round((data.temperature - 273.15) * 9/5 + 32);

    const celciusFeelsLike = Math.round(data.feelsLike - 273.15);
    const fahrenheitFeelsLike = Math.round((data.feelsLike - 273.15) * 9/5 + 32);

    return (
        <div className="weather dm-sans-custom">

            <div className="temperature">
                <p className="number">{celcius}</p>
                <p className="degree-celcius">°</p>
            </div>

            <p className="city">{data.city}</p>
            <div className="bottom-row">
                <div className="humidity">
                    <p className="title">Humidity:</p>
                    <p className="content">{data.humidity}%</p>
                </div>
                <div className="feels-like">
                    <p className="title">Feels Like:</p>
                    <p className="content">{celciusFeelsLike}°</p>
                </div>
            </div>
        </div>
    );
};

export default CurrentWeather;
