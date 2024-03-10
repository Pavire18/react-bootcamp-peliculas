import { useNavigate } from "react-router-dom";
import "./MovieCard.scss";

const MovieCard = ({ movie, tv }) => {
  const navigate = useNavigate();
  const baseUrl = "https://image.tmdb.org/t/p/w200";
  const rating = Math.round(movie.vote_average * 10);
  let ratingStyle = "";
  // Content type para poder saber en movieDetail si es tv o movie (son urls distintas).
  const contentType = tv ? 2 : 1;

  // Calcular el rating y estilar el icono de la card en funcion del rating
  if (rating < 50) {
    ratingStyle = "rating-percentage border-red";
  } else if (rating >= 50 && rating <= 69) {
    ratingStyle = "rating-percentage border-yellow";
  } else if (rating >= 70) {
    ratingStyle = "rating-percentage border-green";
  }

  return (
    <div className="movie-card" onClick={() => navigate("/" + contentType + "/" + movie.id)}>
      <img className="movie-card__img" src={`${baseUrl}${movie.poster_path}`}></img>
      <p>{movie.original_title || movie.original_name}</p>
      <p>{movie.release_date || movie.first_air_date}</p>
      <div className="rating-overlay__card">
        <span className={ratingStyle}>
          {rating}
          <span className="rating-symbol">%</span>
        </span>
      </div>
    </div>
  );
};

export default MovieCard;
