import { FormattedMessage } from "react-intl";
import "./CustomTextSection.scss";

const CustomTextSection = (props) => {
  return (
    <div className="section">
      <img className="section__img" src={props.background}></img>
      <div className="section__info">
        <h2 className="section__title">
          <FormattedMessage id={props.title} />
        </h2>
        <p className="section__text">
          <FormattedMessage id={props.text} />
        </p>
      </div>
    </div>
  );
};

export default CustomTextSection;
