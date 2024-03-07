import PreviewButton from "../PreviewButton/PreviewButton";
import "./PreviewList.scss";
import { useEffect, useState } from "react";

const API_TOKEN = process.env.REACT_APP_TOKEN;

const PreviewList = () => {
  const url = "https://api.themoviedb.org/3/discover/movie?sort_by=release_date.desc&language=en-US&page=1&vote_count.gte=1000&vote_average.gte=5";
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    console.log(url);
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + API_TOKEN,
      },
    })
      .then((data) => data.json())
      .then((dataParsed) => {
        setMovieList(dataParsed.results);
      });
  }, []);

  return (
    <div className="trailers">
      <p>Últimos avances de películas</p>
      <div className="trailers__list">
        {movieList?.map((movie) => (
          <div key={movie.id}>
            <PreviewButton movieId={movie.id}></PreviewButton>
            <p>{movie.original_title || movie.original_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviewList;
