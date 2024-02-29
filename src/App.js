import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import HomePage from "./pages/HomePage/HomePage";
import { createContext, useEffect, useState } from "react";
import English from "./lang/en.json";
import Spanish from "./lang/es.json";
import { IntlProvider } from "react-intl";

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
      <LanguageSelector.Provider value={{ setLanguage: setLocale }}>
        <IntlProvider messages={messages} locale={locale}>
          <HashRouter>
            <Routes>
              <Route path="/" element={<HomePage></HomePage>}></Route>
              <Route path="/pokemons" ></Route>
              <Route path="/pokemon/:pokemonId"></Route>
              <Route path="/location/:locationName"></Route>
              <Route path="/game" ></Route>
            </Routes>
          </HashRouter>
        </IntlProvider>
      </LanguageSelector.Provider>
    </div>
  );
}

export default App;
