import React from 'react';
import { generateRandomSixDigitNumber } from './SeatHelpers';
import MovieData from '../../assets/MovieData.json';

const Confirmation = ({ formattedDate, lastScreenTime, selectedSeatNames, formData, totalPrice }) => {
    const bookingNo = generateRandomSixDigitNumber();

    return (
        <div className="confirmation">
            <div className="confirm-title">
                <img src="./images/booking-completed.png" />
            </div>
            <div className="confirm-movie-info">
                <img className="movie-cover" src={MovieData.movieCover} alt={MovieData.movieName} />
                <div className="movie-info">
                    <div className="movie-information">
                        <div className="movie-name">{MovieData.movieName.toUpperCase()}</div>
                        <div className="movie-info-icons">
                            <img className="movie-rating" src="./images/rate-general.png" />
                            <img className="clock-movie-type" src="./images/type-digital.png" />
                            <div className="movie-type">{MovieData.movieType}</div>
                        </div>
                    </div>
                    <div className="movie-details">
                        <div className="movie-details-cell"><span>Date:</span> {formattedDate()}</div>
                        <div className="movie-details-cell"><span>Hall:</span> {lastScreenTime.hall}</div>
                        <div className="movie-details-cell"><span>Total Price:</span> {totalPrice.toLocaleString()} Baht</div>
                        <div className="movie-details-cell"><span>Time:</span> {lastScreenTime.time}</div>
                        <div className="movie-details-cell"><span>Seat No.</span> {selectedSeatNames.join(', ')}</div>
                        <div className="movie-details-cell"><span>Your Name:</span> {formData.name}</div>
                        <div className="movie-details-cell"><span>Phone No.</span> {formData.phone}</div>
                        <div className="movie-details-cell"><span>Booking No.</span> {bookingNo}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Confirmation;
