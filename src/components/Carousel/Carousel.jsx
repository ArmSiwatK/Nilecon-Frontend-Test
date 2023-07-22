import React from 'react';
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

    const CustomLeftArrow = ({ onClick }) => {
        return (
            <div className="custom-arrow left" onClick={() => onClick()}>
                <img src="./images/btn-prev.png" alt="Carousel Previous Button" />
            </div>
        );
    };

    const CustomRightArrow = ({ onClick }) => {
        return (
            <div className="custom-arrow right" onClick={() => onClick()}>
                <img src="./images/btn-next.png" alt="Carousel Next Button" />
            </div>
        );
    };

    return (
        <Carousel
            responsive={responsive}
            infinite={true}
            customLeftArrow={<CustomLeftArrow />}
            customRightArrow={<CustomRightArrow />}
        >
            {carouselData.map((item, index) => (
                item.url ? (
                    <a key={index} href={item.url} target="_blank" rel="noopener noreferrer">
                        <img className="banner" src={item.imageSrc} alt={`Banner ${index + 1}`} />
                    </a>
                ) : (
                    <img key={index} className="banner" src={item.imageSrc} alt={`Banner ${index + 1}`} />
                )
            ))}
        </Carousel>
    );
};

export default BannerCarousel;
