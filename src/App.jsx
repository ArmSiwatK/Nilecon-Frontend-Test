import React from "react";
import Header from "./components/Header/Header";
import Logo from "./components/Logo/Logo";
import Navbar from "./components/Navbar/Navbar";
import BannerCarousel from "./components/Carousel/Carousel";
import FeatureShows from "./components/FeatureShows/FeatureShows";

function App() {

  return (
    <>
      <Header />
      <Logo />
      <Navbar />
      <BannerCarousel />
      <FeatureShows />
    </>
  )
}

export default App
