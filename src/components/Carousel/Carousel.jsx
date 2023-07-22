import React, { useState } from 'react';
import Carousel from "react-multi-carousel";
import carouselData from '../../assets/CarouselData.json';
import "react-multi-carousel/lib/styles.css";
import './Carousel.scss';

const BannerCarousel = () => {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
        }
    };

    return (
        <Carousel
            responsive={responsive}
            infinite={true}
        >
            <img className="banner" src={"./banners/banner1.jpg"} />
            <img className="banner" src={"./banners/banner2.jpg"} />
            <img className="banner" src={"./banners/banner3.jpg"} />
            <img className="banner" src={"./banners/banner4.jpg"} />
            <img className="banner" src={"./banners/banner5.jpg"} />
        </Carousel>
    );
};

export default BannerCarousel;
