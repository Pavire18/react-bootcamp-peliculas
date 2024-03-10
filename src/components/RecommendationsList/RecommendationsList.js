import { useContext, useEffect, useState } from "react";
import "./RecommendationsList.scss";
import { FormattedMessage } from "react-intl";
import { LanguageSelector } from "../../App";

const API_URL = process.env.REACT_APP_API_URL;
const API_TOKEN = process.env.REACT_APP_TOKEN;

const RecommendationsList = ({ movieId, contentType }) => {
  const { locale } = useContext(LanguageSelector);
  const baseUrl = "https://image.tmdb.org/t/p/w300";
  const recommendationsUrl = API_URL + contentType + movieId + "/recommendations?language=" + locale + "&page=1";
  const [recommendationList, setRecommendationList] = useState([]);

  useEffect(() => {
    console.log(recommendationsUrl);
    fetch(recommendationsUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + API_TOKEN,
      },
    })
      .then((data) => data.json())
      .then((dataParsed) => {
        setRecommendationList(dataParsed.results);
      });
  }, []);

  return (
    <div className="recommendations">
      <h2><FormattedMessage id="recommendations" /></h2>
      <div className="recommendation-list">
        {recommendationList?.map((recommendation) => (
          <div key={recommendation.id}>
            {recommendation.poster_path ? <img className="recommendation-list__img" src={`${baseUrl}${recommendation.backdrop_path}`}></img> : ""}
            <span>{recommendation.original_title || recommendation.original_name}--</span><span>{Math.round(recommendation.vote_average * 10)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationsList;
