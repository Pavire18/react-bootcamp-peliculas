import { useEffect, useState } from "react";
import "./CastList.scss";
import { FormattedMessage } from "react-intl";

const API_URL = process.env.REACT_APP_API_URL;
const API_TOKEN = process.env.REACT_APP_TOKEN;

const CastList = ({ movieId, contentType }) => {
  const baseUrl = "https://image.tmdb.org/t/p/w200";
  const creditsUrl = API_URL + contentType + movieId + "/credits";
  const [actorsList, setActorList] = useState([]);

  useEffect(() => {
    console.log(creditsUrl);
    fetch(creditsUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + API_TOKEN,
      },
    })
      .then((data) => data.json())
      .then((dataParsed) => {
        const cast = [...dataParsed.cast, ...dataParsed.crew];
        setActorList(cast);
      });
  }, []);

  return (
    <div className="cast">
      <h2><FormattedMessage id="castList" /></h2>
      <div className="cast-list">
        {actorsList?.map((actor) => (
          <div key={actor.id}>
            {actor.profile_path ? <img className="movie-card__img" src={`${baseUrl}${actor.profile_path}`}></img> : ""}
            <p>{actor.original_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CastList;
