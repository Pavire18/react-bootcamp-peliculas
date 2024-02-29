import CustomTextSection from "../../components/CustomTextSection/CustomTextSection";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./HomePage.scss";

const HomePage = () => {
  return (
    <div className="page">
      <Header></Header>
      <div className="page__content">
        <CustomTextSection title="customSection:welcome" text="customSection:info1"></CustomTextSection>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default HomePage;
