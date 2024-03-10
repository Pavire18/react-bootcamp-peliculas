import { useParams } from "react-router-dom";
import "./MovieDetail.scss";
import { useContext, useEffect, useState } from "react";
import Header from "../Header/Header";
import CastList from "../CastList/CastList";
import RecommendationsList from "../RecommendationsList/RecommendationsList";
import { FormattedMessage } from "react-intl";
import { LanguageSelector } from "../../App";

const API_URL = process.env.REACT_APP_API_URL;
const API_TOKEN = process.env.REACT_APP_TOKEN;

const MovieDetail = () => {
  const { contentType, movieId } = useParams();
  const { locale } = useContext(LanguageSelector);
  const baseUrl = "https://image.tmdb.org/t/p/w200";
  let voteRating = null;
  let ratingStyle = "";
  const [movieDetails, setMovieDetails] = useState({});
  const [movieGenres, setGenres] = useState([]);
  const [movieDuration, setMovieDuration] = useState("");
  // He usado un state con el valor del rating y el estilo.
  const [rating, setRating] = useState({ value: 0, style: "rating-percentage border-green" });

  // Creo el parámetro que tengo que meter en la url para hacer la petición para sacar los datos.
  let content = "movie/";
  if (contentType === "1") {
    content = "movie/";
  } else {
    content = "tv/";
  }
  const detailsUrl = API_URL + content + movieId + "?language=" + locale;

  /*
  Obtengo los datos necesarios para enseñar en pantalla.
  */
  useEffect(() => {
    console.log(detailsUrl);
    fetch(detailsUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + API_TOKEN,
      },
    })
      .then((data) => data.json())
      .then((dataParsed) => {
        setMovieDetails(dataParsed);
        setGenres(dataParsed.genres.map((genre) => genre.name));
        setMovieDuration(Math.floor(dataParsed.runtime / 60) + "h " + (dataParsed.runtime % 60) + "m");

        // Cargo los datos y el estilo del circulo de rating del usuario.
        voteRating = Math.round(dataParsed.vote_average * 10);
        if (voteRating < 50) {
          ratingStyle = "rating-percentage border-red";
        } else if (voteRating >= 50 && voteRating <= 69) {
          ratingStyle = "rating-percentage border-yellow";
        } else if (voteRating >= 70) {
          ratingStyle = "rating-percentage border-green";
        }
        setRating({ value: Math.round(dataParsed.vote_average * 10), style: ratingStyle });
      });
  }, []);

  return (
    <div className="movie">
      <Header></Header>
      <div className="movie-details">
        <img className="movie-card__img" src={`${baseUrl}${movieDetails.poster_path}`}></img>
        <div className="movie-details__info">
          <div>
            <h2 className="movie-details__title">{movieDetails.original_title || movieDetails.original_name}</h2>
            <p className="movie-details__subtitle">{(movieDetails.release_date || movieDetails.first_air_date) + "(" + movieDetails.original_language + ") | " + movieGenres.join(",") + " | " + movieDuration}</p>
          </div>
          <div className="movie-details__rating">
            <div className="rating-overlay">
              <span className={rating.style}>
                {rating.value}
                <span className="rating-symbol">%</span>
              </span>
            </div>
            <span><FormattedMessage id="movieDetail:userVote" /></span>
          </div>
          <p className="movie-details__subtitle">{movieDetails.tagline}</p>
          <div>
            <h3><FormattedMessage id="movieDetail:overview" /></h3>
            <p>{movieDetails.overview}</p>
          </div>
        </div>
      </div>
      <CastList movieId={movieId} contentType={content}></CastList>
      <RecommendationsList movieId={movieId} contentType={content}></RecommendationsList>
    </div>
  );
};

export default MovieDetail;
