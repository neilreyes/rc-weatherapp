import Moment from "react-moment";

const SingleWeatherCard = ({ data }) => {
  const { Date, Day } = data;

  return (
    <article className="col col-12 single-weather text-center">
      {console.log(data)}

      <div className="single-weather-wrap text-center d-flex align-items-center flex-row p-3 justify-content-between">
        <img
          src={`https://developer.accuweather.com/sites/default/files/${
            Day.Icon >= 10 ? Day.Icon : "0" + Day.Icon
          }-s.png`}
          alt={Day.IconPhrase}
          className="weather-icon my-3"
        />
        <div className="forecasts-meta">
          <div className="weatherDate">
            <Moment format="dddd" className="weather-date weather-date-line1">
              {Date}
            </Moment>
            <br />
            <Moment
              format="MMMM Do"
              className="weather-date weather-date-line2 d-none"
            >
              {Date}
            </Moment>
          </div>
          <p className="weather-phrase">{Day.IconPhrase}</p>
        </div>
      </div>
    </article>
  );
};

export default SingleWeatherCard;
