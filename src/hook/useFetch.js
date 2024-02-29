import { useEffect, useState } from "react";

const useFetch = (apiUrl) => {
  const [result, setResult] = useState(null);
  useEffect(() => {
    if (apiUrl) {
      fetch(apiUrl)
        .then((data) => data.json())
        .then((dataParsed) => setResult(dataParsed));
    }
  }, [apiUrl]);
  return [result];
};

export default useFetch;
