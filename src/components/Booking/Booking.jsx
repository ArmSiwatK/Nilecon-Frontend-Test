import React, { useState, useContext } from 'react';
import { ScreenContext } from '../../ScreenContext';
import BookingInfo from './BookingInfo';
import SeatChoices from './SeatChoices';
import MovieData from '../../assets/MovieData.json';
import Halls from '../../assets/Halls.json';
import './Booking.scss';

const Booking = () => {
    const { selectedScreen } = useContext(ScreenContext);

    const lastScreenTime = selectedScreen || MovieData.screenTime[MovieData.screenTime.length - 1];
    const hallData = Halls.find((hall) => hall.number === lastScreenTime.hall);
    const seatTypes = hallData ? hallData.seatTypes : [];

    const [currentStep, setCurrentStep] = useState(1);
    const [seatAmounts, setSeatAmounts] = useState(seatTypes.map(() => 1));

    const handleGoBack = () => {
        if (currentStep === 1) {
            window.history.back();
        } else {
            setCurrentStep((prevStep) => prevStep - 1);
        }
    };

    const handleNextStep = () => {
        setCurrentStep((prevStep) => prevStep + 1);
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

            <BookingInfo selectedScreen={selectedScreen} />

            <div className="booking-step">
                <img src={`./images/booking-step-${currentStep}.png`} />
            </div>

            {currentStep === 1 && (
                <SeatChoices
                    seatTypes={seatTypes}
                    seatAmounts={seatAmounts}
                    handleSeatAmountChange={handleSeatAmountChange}
                />
            )}

            {currentStep === 2 && (
                <div className="seat-position">
                    {/* Seat positions rendering */}
                </div>
            )}

            {currentStep === 3 && (
                <div className="confirmation">
                    {/* Confirmation rendering */}
                </div>
            )}

            <div className="next-button">
                <input type="image" src="./images/btn-seat-next.png" alt="Next" onClick={handleNextStep} />
            </div>
        </div>
    );
};

export default Booking;
