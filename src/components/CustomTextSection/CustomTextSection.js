import { FormattedMessage } from "react-intl";
import "./CustomTextSection.scss";

const CustomTextSection = (props) => {
  const containerStyle = {
    backgroundImage: `url(${props.background}) `,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "inherit",
    position: "relative",
    width: "100%",
    height: "300px",
  };

  return (
    <div style={containerStyle} className="section">
      <h2 className="section__title">
        <FormattedMessage id={props.title} />
      </h2>
      <p className="section__text">
        <FormattedMessage id={props.text} />
      </p>
    </div>
  );
};

export default CustomTextSection;
