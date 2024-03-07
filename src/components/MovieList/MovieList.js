import { useContext, useEffect, useState } from "react";
import "./MovieList.scss";
import { FormattedMessage } from "react-intl";
import MovieCard from "../MovieCard/MovieCard";
import { LanguageSelector } from "../../App";

// day?language=en-US
const API_URL = process.env.REACT_APP_API_URL;
const API_TOKEN = process.env.REACT_APP_TOKEN;

const MovieList = ({ section }) => {
  const { locale } = useContext(LanguageSelector);
  const [firstList, setTodayList] = useState([]);
  const [secondList, setWeekList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [activeButton, setActiveButton] = useState(1);
  let templateData = null;
  let tv = false;

  const SECTION_DATA = {
    trending: {
      url1: "trending/movie/day?language=" + locale + "&page=1",
      url2: "trending/movie/week?language=" + locale + "&page=1",
      text1: "trendingList:trending",
      text2: "trendingList:today",
      text3: "trendingList:thisWeek",
    },
    most_popular: {
      url1: "movie/popular?language=" + locale + "&page=1",
      url2: "tv/popular?language=" + locale + "&page=1",
      text1: "mostPopularList:mostPopular",
      text2: "mostPopularList:movies",
      text3: "mostPopularList:television",
    },
    free: {
      url1: "discover/movie?sort_by=release_date.desc&language=" + locale + "&page=1&vote_count.gte=1000&vote_average.gte=5&watch_region=ES&with_watch_monetization_types=free",
      url2: "discover/tv?sort_by=release_date.desc&language=" + locale + "&page=1&vote_average.gte=5&vote_count.gte=1000&watch_region=ES&with_watch_monetization_types=free",
      text1: "freeList:whatchFree",
      text2: "freeList:movies",
      text3: "freeList:television",
    },
  };

  switch (section) {
    case "trending":
      templateData = SECTION_DATA.trending;
      break;
    case "most_popular":
      templateData = SECTION_DATA.most_popular;
      tv = true;
      break;
    case "free":
      templateData = SECTION_DATA.free;
      tv = true;
      break;
  }

  const firstType = API_URL + templateData.url1;
  const secondType = API_URL + templateData.url2;

  useEffect(() => {
    fetch(firstType, {
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
    fetch(secondType, {
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
      case "first":
        setMovieList(firstList);
        setActiveButton(1);
        break;
      case "second":
        setMovieList(secondList);
        setActiveButton(2);
        break;
      default:
        setMovieList(firstList);
        setActiveButton(1);
        break;
    }
  };
  return (
    <div className="trending">
      <div className="trending__options">
        <h2>
          <FormattedMessage id={templateData.text1} />
        </h2>
        <div className="trending__select">
          <button className="trending__btn-t" onClick={() => changeList("first")} style={{ backgroundColor: activeButton === 1 ? "#052641" : "#FFFF", color: activeButton === 1 ? "#fff" : "#000" }}>
            <FormattedMessage id={templateData.text2} />
          </button>
          <button className="trending__btn-w" onClick={() => changeList("second")} style={{ backgroundColor: activeButton === 2 ? "#052641" : "#FFF", color: activeButton === 2 ? "#fff" : "#000" }}>
            <FormattedMessage id={templateData.text3} />
          </button>
        </div>
      </div>
      <div className="movie-list">
        {movieList?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} tv={tv && activeButton === 2}></MovieCard>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
