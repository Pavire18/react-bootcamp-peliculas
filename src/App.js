import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import HomePage from "./pages/HomePage/HomePage";
import { createContext, useEffect, useState } from "react";
import English from "./lang/en.json";
import Spanish from "./lang/es.json";
import { IntlProvider } from "react-intl";
import MovieDetail from "./components/MovieDetail/MovieDetail";
import Game from "./components/Game/Game";

export const LanguageSelector = createContext();

function App() {
  const [locale, setLocale] = useState(navigator.language);
  const [messages, setMessage] = useState(English);

  useEffect(() => {
    switch (locale) {
      case "es-ES":
        setMessage(Spanish);
        break;
      default:
        setMessage(English);
        break;
    }
  }, [locale]);

  return (
    <div className="app">
      <LanguageSelector.Provider value={{ locale, setLanguage: setLocale }}>
        <IntlProvider messages={messages} locale={locale}>
          <HashRouter>
            <Routes>
              <Route path="/" element={<HomePage></HomePage>}></Route>
              <Route path="/:contentType/:movieId" element={<MovieDetail></MovieDetail>}></Route>
              <Route path="/game" element={<Game></Game>}></Route>
            </Routes>
          </HashRouter>
        </IntlProvider>
      </LanguageSelector.Provider>
    </div>
  );
}

export default App;
