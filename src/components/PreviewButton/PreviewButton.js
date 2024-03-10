import { useEffect, useState } from "react";
import "./PreviewButton.scss";
const API_TOKEN = process.env.REACT_APP_TOKEN;
const API_URL = process.env.REACT_APP_API_URL;

const PreviewButton = (props) => {
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    fetch(API_URL + "/movie/" + props.movieId + "/videos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + API_TOKEN,
      },
    })
      .then((data) => data.json())
      .then((dataParsed) => {
        let clip;
        let trailer;
        for (let i = 0; i < dataParsed.results.length; i++) {
          switch (dataParsed.results[i].type) {
            case "Clip":
              clip = dataParsed.results[i].key;
              break;
            case "Trailer":
              trailer = dataParsed.results[i].key;
              break;
          }
        }
        setVideoUrl("https://www.youtube.com/watch?v=" + (trailer || clip));
      });
  }, []);

  return (
    <div >
      <a className="preview-btn" href={videoUrl} target="_blank" rel="noopener noreferrer">
        Ver en Youtube
      </a>
    </div>
  );
};

export default PreviewButton;
