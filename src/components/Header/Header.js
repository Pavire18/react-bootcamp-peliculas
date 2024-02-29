import { NavLink } from "react-router-dom";
import "./Header.scss";
import logo from "../../assets/header-logo.png";
import { useContext } from "react";
import { LanguageSelector } from "../../App";

const Header = () => {
  const { setLanguage } = useContext(LanguageSelector);

  return (
    <header className="header">
      <div className="header__nav">
        <img className="header__img" src={logo}></img>
        <div className="header__links">
          <NavLink className="header__links-link" to="/">Películas</NavLink>
          <NavLink className="header__links-link" to="/game">Quiz</NavLink>
        </div>
      </div>
      <div>
        <div className="header__lang">
          <button className="header__lang-btn" onClick={() => setLanguage("es-ES")}>
            ES
          </button>
          <button className="header__lang-btn" onClick={() => setLanguage("en-EN")}>
            EN
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
