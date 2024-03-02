import { useEffect, useState } from "react";
import "./TrendingList.scss";
import { FormattedMessage } from "react-intl";
import MovieCard from "../MovieCard/MovieCard";

// day?language=en-US
const API_URL = process.env.REACT_APP_API_URL;
const API_TOKEN = process.env.REACT_APP_TOKEN;

const TrendingList = () => {
  const [todayList, setTodayList] = useState([]);
  const [weekList, setWeekList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const todayUrl = API_URL + "day?language=en-US&page=1";
  const weekUrl = API_URL + "week?language=en-US&page=1";

  useEffect(() => {
    console.log(todayUrl);
    fetch(todayUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + API_TOKEN,
      },
    })
      .then((data) => data.json())
      .then((dataParsed) => {
        setTodayList(dataParsed.results);
        setMovieList(dataParsed.results);
      });
  }, []);

  useEffect(() => {
    console.log(weekUrl);
    fetch(weekUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + API_TOKEN,
      },
    })
      .then((data) => data.json())
      .then((dataParsed) => setWeekList(dataParsed.results));
  }, []);

  const changeList = (list) => {
    switch (list) {
      case "today":
        setMovieList(todayList);
        break;
      case "week":
        setMovieList(weekList);
        break;
      default:
        setMovieList(todayList);
        break;
    }
  };
  return (
    <div className="trending">
      <div className="trending__options">
        <h2>
          <FormattedMessage id="trendingList:trending" />
        </h2>
        <div className="trending__select">
          <button className="trending__btn-t" onClick={() => changeList("today")}>
            <FormattedMessage id="trendingList:today" />
          </button>
          <button className="trending__btn-w" onClick={() => changeList("week")}>
            <FormattedMessage id="trendingList:thisWeek" />
          </button>
        </div>
      </div>
      <div className="movie-list">
        {movieList?.map((movie) => (
          <MovieCard key={movie.id} movie={movie}></MovieCard>
        ))}
      </div>
    </div>
  );
};

export default TrendingList;
