import React from 'react';
import movieData from '../../assets/MovieData.json';
import './Booking.scss';

const Booking = () => {
    const today = new Date();

    const getMonthName = (monthIndex) => {
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return monthNames[monthIndex];
    };

    const formattedDate = () => {
        const day = today.getDate();
        const monthIndex = today.getMonth();
        const year = today.getFullYear();

        return `${day} ${getMonthName(monthIndex)} ${year}`;
    };

    const handleGoBack = () => {
        window.history.back();
    };

    const lastScreenTime = movieData.screenTime[movieData.screenTime.length - 1];

    return (
        <div className="booking-container">
            <div className="back-button">
                <input type="image" src="./images/btn-back.png" onClick={handleGoBack} alt="Back" />
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
                    <div className="movie-details">
                        <div className="movie-details-cell"><span>Date:</span> {formattedDate()}</div>
                        <div className="movie-details-cell"><span>Time:</span> {lastScreenTime.time}</div>
                        <div className="movie-details-cell"><span>Hall:</span> {lastScreenTime.hall}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Booking;
