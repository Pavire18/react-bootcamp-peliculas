import { useContext, useEffect, useState } from "react";
import Header from "../Header/Header";
import "./Game.scss";
import { LanguageSelector } from "../../App";
import CustomGameButtons from "../CustomGameButtons/CustomGameButtons";

const API_URL = process.env.REACT_APP_API_URL;
const API_TOKEN = process.env.REACT_APP_TOKEN;

const Game = () => {
  const [movies, setMovies] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [titulo, setTitulo] = useState("???????????");

  const { locale } = useContext(LanguageSelector);
  const detailsUrl = API_URL + "movie/top_rated?language=" + locale + "&page=" + (Math.floor(Math.random() * 100) + 1);
  const baseUrl = "https://image.tmdb.org/t/p/w200";

  /*
  Conseguir 4 peliculas aleatorias de la página aleatoria.
  Primero coge 4 números aleatorios dentro del tamaño de la página y usa esos números como index.
  */
  const generarPeliculasAleatorias = (data) => {
    const numerosAleatorios = [];

    while (numerosAleatorios.length < 4) {
      const numeroAleatorio = Math.floor(Math.random() * data.length);

      if (numerosAleatorios.indexOf(numeroAleatorio) === -1) {
        numerosAleatorios.push(numeroAleatorio);
      }
    }

    const moviesToPlay = [];
    numerosAleatorios.forEach((num) => {
      moviesToPlay.push(data[num]);
    });

    return moviesToPlay;
  };

  /*
  Está la comprobación de gameStarted para poder reiniciar la partida la acertar o al resetear.
  */
  useEffect(() => {
    if (!gameStarted) {
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
          setMovies(() => generarPeliculasAleatorias(dataParsed.results));
          setGameStarted(true);
        });
    }
  }, [gameStarted]);

  return (
    <div>
      <Header></Header>
      <div className="movie-details">
        <img className="movie-card__img" src={`${baseUrl}${movies[0]?.poster_path}`}></img>
        <div className="movie-details__info">
          <div>
            <h2 className="movie-details__title">{titulo}</h2>
            <p className="movie-details__subtitle">{(movies[0]?.release_date || movies[0]?.first_air_date) + "(" + movies[0]?.original_language + ")"}</p>
          </div>

          <div>
            <h3>Sinopsis</h3>
            <p>{movies[0]?.overview}</p>
          </div>
        </div>
      </div>
      <CustomGameButtons setTitulo={setTitulo} setGameStarted={setGameStarted} respuestas={movies?.map((movie) => movie.original_title)} respuestaCorrecta={movies[0]?.original_title}></CustomGameButtons>
    </div>
  );
};

export default Game;
