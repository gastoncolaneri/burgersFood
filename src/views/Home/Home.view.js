import React from "react";
import Banner from "../../assets/banner.jpg";
import CardList from "../../components/Home/CardList/CardList.component";
import "./home.styles.css";

const Home = () => {
  return (
    <>
      <div className="banner__box">
        <img src={Banner} alt="banner" className="banner" loading="lazy" />
        <div className="banner__text">Tu restaurante favorito</div>
      </div>
      <CardList />
    </>
  );
};

export default Home;
