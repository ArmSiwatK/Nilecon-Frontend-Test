import React, { useState } from 'react';
import carouselData from '../../assets/CarouselData.json';
import './Carousel.scss';

const Carousel = () => {
    const [currentImage, setCurrentImage] = useState(0);

    const handleNext = () => {
        setCurrentImage((prevImage) => (prevImage + 1) % carouselData.length);
    };

    const handlePrev = () => {
        setCurrentImage((prevImage) => (prevImage - 1 + carouselData.length) % carouselData.length);
    };

    return (
        <div className="carousel">
            {carouselData[currentImage].url ? (
                <a href={carouselData[currentImage].url} target="_blank" rel="noopener noreferrer">
                    <img className="banner" src={carouselData[currentImage].imageSrc} alt={`Banner ${currentImage + 1}`} />
                </a>
            ) : (
                <img className="banner" src={carouselData[currentImage].imageSrc} alt={`Banner ${currentImage + 1}`} />
            )}
            <div className="carousel-control">
                <a className="button-previous" onClick={handlePrev}>
                    <img src="./images/btn-prev.png" alt="Carousel Previous Button" />
                </a>
                <a className="button-next" onClick={handleNext}>
                    <img src="./images/btn-next.png" alt="Carousel Next Button" />
                </a>
            </div>
        </div>
    );
};

export default Carousel;
