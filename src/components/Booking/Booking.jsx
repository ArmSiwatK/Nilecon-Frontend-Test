import React from 'react';
import movieData from '../../assets/MovieData.json';
import './Booking.scss';

const Booking = () => {
    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <div className="booking-container">
            <div className="back-button">
                <input type="image" src="./images/btn-back.png" onClick={handleGoBack} />
            </div>
            <div className="booking-info">
                <img className="movie-cover" src={movieData.movieCover} alt={movieData.movieName} />
                <div className="movie-info">
                    <div className="movie-name">{movieData.movieName.toUpperCase()}</div>
                    <div className="movie-info-icons">
                        <img className="movie-rating" src="./images/rate-general.png" />
                        <img className="clock-movie-type" src="./images/type-digital.png" />
                        <div className="movie-type">{movieData.movieType}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Booking;
