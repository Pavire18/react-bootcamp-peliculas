import CustomTextSection from "../../components/CustomTextSection/CustomTextSection";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./HomePage.scss";
import imgBg1 from "../../assets/text-section1.png";
import imgBg2 from "../../assets/text-section2.png";
import PreviewList from "../../components/PreviewList/PreviewList";
import MovieList from "../../components/MovieList/MovieList";

const HomePage = () => {
  return (
    <div className="page">
      <Header></Header>
      <div className="page__content">
        <CustomTextSection background={imgBg1} title="customSection:welcome" text="customSection:info1"></CustomTextSection>
        <MovieList section="trending"></MovieList>
        <PreviewList></PreviewList>
        <MovieList section="most_popular"></MovieList>
        <CustomTextSection background={imgBg2} title="customSection:joinToday" text="customSection:info2"></CustomTextSection>
        <MovieList section="free"></MovieList>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default HomePage;
