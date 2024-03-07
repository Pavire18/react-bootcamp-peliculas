import { useState } from "react";

const useFetch = (apiUrl) => {
  const [result, setResult] = useState([]);
  const API_TOKEN = process.env.REACT_APP_TOKEN;
  if (apiUrl) {
    fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + API_TOKEN,
      },
    })
      .then((data) => data.json())
      .then((dataParsed) => setResult(dataParsed));
  }

  return [result];
};

export default useFetch;
