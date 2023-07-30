import React, { useState, useEffect } from 'react';
import { generateRandomSixDigitNumber } from '../BookingHelpers';
import MovieData from '../../../assets/MovieData.json';
import "../styles/Confirmation.scss";

const Confirmation = ({ formattedDate, lastScreenTime, selectedSeatNames, formData, totalPrice }) => {
    const [isMobile, setIsMobile] = useState(false);

    const bookingNo = generateRandomSixDigitNumber();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 800);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="confirmation">
            <div className="confirm-title">
                <img src="./images/booking-completed.png" />
            </div>
            <div className="confirm-movie-info">
                {!isMobile && (
                    <img className="movie-cover" src={MovieData.movieCover} alt={MovieData.movieName} />
                )}
                <div className="movie-info">
                    <div className="movie-information">
                        {isMobile && (
                            <img className="movie-cover" src={MovieData.movieCover} alt={MovieData.movieName} />
                        )}
                        <div className="movie-information-wrapper">
                            <div className="movie-name">{MovieData.movieName.toUpperCase()}</div>
                            <div className="movie-info-icons">
                                <img className="movie-rating" src="./images/rate-general.png" />
                                <img className="clock-movie-type" src="./images/type-digital.png" />
                                <div className="movie-type">{MovieData.movieType}</div>
                            </div>
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
            <div className="confirm-bottom">
                <div className="qr-container">
                    <img src="./images/qr-code.png" />
                    <div className="qr-subtitle">Booking No. {bookingNo}</div>
                </div>
                <div className="warning-messages">
                    <div>Please pay for your reserved tickets at Box Office 60 minutes before showtime</div>
                    <div>Bookings will be automatically cancelled if not issued 60 minutes before showtime</div>
                </div>
            </div>
        </div>
    );
};

export default Confirmation;
