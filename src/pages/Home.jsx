import React from "react";
import Header from "../components/Header/Header";
import Logo from "../components/Logo/Logo";
import Navbar from "../components/Navbar/Navbar";
import BannerCarousel from "../components/Carousel/Carousel";
import FeatureShows from "../components/FeatureShows/FeatureShows";
import Footer from "../components/Footer/Footer";
import MenuMobile from "../components/MenuMobile/MenuMobile";

function Home() {
    return (
        <>
            <Header />
            <Logo />
            <Navbar />
            <BannerCarousel />
            <FeatureShows />
            <Footer />
            <MenuMobile />
        </>
    )
}

export default Home
