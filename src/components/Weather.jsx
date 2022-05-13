import React from "react";
import { Row } from "react-bootstrap";
import SingleWeatherCard from "./SingleWeatherCard";

const Weather = ({ data }) => {
  if (data == null) {
    return <article className="weather-card"></article>;
  } else {
    const { Location, DailyForecasts, Condition } = data;
    const { EnglishName } = Location;
    const { WeatherIcon, WeatherText, Temperature } = Condition;
    const { Headline } = DailyForecasts;

    return (
      <article className="weather-card">
        <div className="weather-card-wrap">
          <header className="text-center forecasts-header">
            {console.log(data)}
            <h1 className="EnglishName">
              {EnglishName}
              <span className="your-location-label">Today</span>
            </h1>
            <img
              src={`https://developer.accuweather.com/sites/default/files/${
                WeatherIcon >= 10 ? WeatherIcon : "0" + WeatherIcon
              }-s.png`}
              alt={WeatherText}
            />
            <h2 className="weather">{WeatherText}</h2>
            <div className="temperature-container d-flex justify-content-center">
              <p className="temperature temperature-imperial mx-1 fw-bold">
                {`${Temperature.Imperial.Value}°${Temperature.Imperial.Unit}`}
              </p>
              <p className="temperature temperature-metric mx-1 fw-bold">
                {`${Temperature.Metric.Value}°${Temperature.Metric.Unit}`}
              </p>
            </div>
            <h3 className="Headline text-center mt-2">{Headline.Text}</h3>
          </header>

          <section className="daily-forecasts d-flex p-2 bd-highlight justify-content-center">
            <div className="daily-forecasts-wrap mt-3">
              <h4 className="Subheadline ">3 day forecasts</h4>
              <Row className="flex-wrap weather-entries">
                {DailyForecasts.DailyForecasts.slice(1, 4).map(
                  (entry, index) => (
                    <SingleWeatherCard data={entry} key={index} />
                  )
                )}
              </Row>
            </div>
          </section>
        </div>
      </article>
    );
  }
};

export default Weather;
