import "./Footer.scss";
import img from "../../assets/footer-img.png";

const Footer = () => {
  return (
    <footer className="footer">
      <img className="footer__img" src={img}></img>
    </footer>
  );
};

export default Footer;
