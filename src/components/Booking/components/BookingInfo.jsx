import React from 'react';
import MovieData from '../../../assets/MovieData.json';
import "../styles/BookingInfo.scss";

const BookingInfo = ({ lastScreenTime, formattedDate }) => {
    return (
        <div className="booking-info">
            <img className="movie-cover" src={MovieData.movieCover} alt={MovieData.movieName} />
            <div className="movie-info">
                <div className="movie-name">{MovieData.movieName.toUpperCase()}</div>
                <div className="movie-info-icons">
                    <img className="movie-rating" src="./images/rate-general.png" />
                    <img className="clock-movie-type" src="./images/type-digital.png" />
                    <div className="movie-type">{MovieData.movieType}</div>
                </div>
                <div className="movie-details">
                    <div className="movie-details-cell"><span>Date:</span> {formattedDate()}</div>
                    <div className="movie-details-cell"><span>Time:</span> {lastScreenTime.time}</div>
                    <div className="movie-details-cell"><span>Hall:</span> {lastScreenTime.hall}</div>
                </div>
            </div>
        </div>
    );
};

export default BookingInfo;
