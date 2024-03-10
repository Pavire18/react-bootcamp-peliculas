import { useContext, useEffect, useState } from "react";
import "./MovieList.scss";
import { FormattedMessage } from "react-intl";
import MovieCard from "../MovieCard/MovieCard";
import { LanguageSelector } from "../../App";

const API_URL = process.env.REACT_APP_API_URL;
const API_TOKEN = process.env.REACT_APP_TOKEN;

/*
  Objeto donde obtengo los datos para reutilizar el componente para las 3 tipo de listas.
*/
const SECTION_DATA = {
  trending: {
    url1: (locale) => "trending/movie/day?language=" + locale + "&page=1",
    url2: (locale) => "trending/movie/week?language=" + locale + "&page=1",
    text1: "trendingList:trending",
    text2: "trendingList:today",
    text3: "trendingList:thisWeek",
  },
  most_popular: {
    url1: (locale) => "movie/popular?language=" + locale + "&page=1",
    url2: (locale) => "tv/popular?language=" + locale + "&page=1",
    text1: "mostPopularList:mostPopular",
    text2: "mostPopularList:movies",
    text3: "mostPopularList:television",
  },
  free: {
    url1: (locale) => "discover/movie?sort_by=release_date.desc&language=" + locale + "&page=1&vote_count.gte=1000&vote_average.gte=5&watch_region=ES&with_watch_monetization_types=free",
    url2: (locale) => "discover/tv?sort_by=release_date.desc&language=" + locale + "&page=1&vote_average.gte=5&vote_count.gte=1000&watch_region=ES&with_watch_monetization_types=free",
    text1: "freeList:whatchFree",
    text2: "freeList:movies",
    text3: "freeList:television",
  },
};

const MovieList = ({ section }) => {
  const { locale } = useContext(LanguageSelector);
  const [firstList, setTodayList] = useState([]);
  const [secondList, setWeekList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [activeButton, setActiveButton] = useState(1);
  let templateData = null;
  let tv = false;

  /*
  En función del prop que se le pasa al componente, se eligen unas url u otras.
  */
  templateData = SECTION_DATA[section];
  tv = section !== "trending";

  const firstType = API_URL + templateData.url1(locale);
  const secondType = API_URL + templateData.url2(locale);

  /*
  Cargar datos de la primera url
  */
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

  /*
  Cargar datos de la segunda url
  */
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

  /*
  Cambiar la list a la que accedo en el html y cambiar los estilos de los botones.
   */
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
