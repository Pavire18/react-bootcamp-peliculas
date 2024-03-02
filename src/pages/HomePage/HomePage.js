import CustomTextSection from "../../components/CustomTextSection/CustomTextSection";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./HomePage.scss";
import imgBg1 from "../../assets/text-section1.png";
import TrendingList from "../../components/TrendingList/TrendingList";

const HomePage = () => {
  return (
    <div className="page">
      <Header></Header>
      <div className="page__content">
        <CustomTextSection background={imgBg1} title="customSection:welcome" text="customSection:info1"></CustomTextSection>
        <TrendingList></TrendingList>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default HomePage;
