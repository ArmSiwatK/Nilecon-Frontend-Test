import React, { useState, useContext } from 'react';
import { ScreenContext } from '../../ScreenContext';
import MovieData from '../../assets/MovieData.json';
import Months from '../../assets/Months.json';
import Seats from '../../assets/Seats.json';
import Halls from '../../assets/Halls.json';
import './Booking.scss';

const Booking = () => {
    const { selectedScreen } = useContext(ScreenContext);

    const today = new Date();
    const lastScreenTime = selectedScreen || MovieData.screenTime[MovieData.screenTime.length - 1];
    const hallData = Halls.find((hall) => hall.number === lastScreenTime.hall);
    const seatTypes = hallData ? hallData.seatTypes : [];

    const [currentStep, setCurrentStep] = useState(1);
    const [seatAmounts, setSeatAmounts] = useState(seatTypes.map(() => 1));

    const formattedDate = () => {
        const getMonthName = (monthIndex) => {
            return Months.months[monthIndex];
        };

        const day = today.getDate();
        const monthIndex = today.getMonth();
        const year = today.getFullYear();

        return `${day} ${getMonthName(monthIndex)} ${year}`;
    };

    const handleGoBack = () => {
        window.history.back();
    };

    const handleSeatAmountChange = (index, amount) => {
        const newSeatAmounts = [...seatAmounts];
        const newAmount = Math.min(Math.max(newSeatAmounts[index] + amount, 0), 3);
        newSeatAmounts[index] = newAmount;
        setSeatAmounts(newSeatAmounts);
    };

    return (
        <div className="booking-container">
            <div className="back-button">
                <input type="image" src="./images/btn-back.png" onClick={handleGoBack} alt="Back" />
            </div>
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
            <div className="booking-step">
                <img src={`./images/booking-step-${currentStep}.png`} />
            </div>
            <div className="seat-choices">
                {seatTypes.map((seatType, index) => {
                    const seatData = Seats.find((seat) => seat.name === seatType);
                    if (!seatData) return null;

                    const formattedPrice = Number(seatData.price).toLocaleString();

                    return (
                        <div key={index} className="seat-info">
                            <img className="seat-image" src={seatData.image} alt={seatData.name} />
                            <div className="seat-name">
                                {`${seatData.name} (${seatData.seats} Seats)`}
                            </div>
                            <div className="seat-price">{`${formattedPrice} Baht`}</div>
                            <div className="seat-amount">
                                <img
                                    className="subtract-button"
                                    src="./images/btn-seat-subtract.png"
                                    alt="Subtract"
                                    onClick={() => handleSeatAmountChange(index, -1)}
                                />
                                <div className="amount-display">{seatAmounts[index]}</div>
                                <img
                                    className="add-button"
                                    src="./images/btn-seat-add.png"
                                    alt="Add"
                                    onClick={() => handleSeatAmountChange(index, 1)}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="next-button">
                <input type="image" src="./images/btn-seat-next.png" alt="Next" />
            </div>
        </div>
    );
};

export default Booking;
