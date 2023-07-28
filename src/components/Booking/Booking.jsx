import React, { useState, useContext } from 'react';
import { ScreenContext } from '../../ScreenContext';
import BookingInfo from './BookingInfo';
import SeatChoices from './SeatChoices';
import AlertBox from '../AlertBox/AlertBox';
import Halls from '../../assets/Halls.json';
import Seats from '../../assets/Seats.json';
import './Booking.scss';

const Booking = () => {
    const { selectedScreen } = useContext(ScreenContext);

    const hallData = Halls.find((hall) => hall.number === selectedScreen.hall);
    const seatTypes = hallData ? hallData.seatTypes : [];

    const [currentStep, setCurrentStep] = useState(1);
    const [seatAmounts, setSeatAmounts] = useState(seatTypes.map(() => 0));
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [showAlert, setShowAlert] = useState(false);

    const handleGoBack = () => {
        if (currentStep === 1) {
            window.history.back();
        } else {
            setCurrentStep((prevStep) => prevStep - 1);
        }
    };

    const handleNextStep = () => {
        if (seatAmounts.every(amount => amount === 0)) {
            setShowAlert(true);
        } else {
            setCurrentStep(prevStep => prevStep + 1);
        }
    };

    const handleSeatAmountChange = (index, amount) => {
        const newSeatAmounts = [...seatAmounts];
        const newAmount = Math.min(Math.max(newSeatAmounts[index] + amount, 0), 3);
        newSeatAmounts[index] = newAmount;
        setSeatAmounts(newSeatAmounts);
    };

    const handleSeatSelection = (rowIndex, seatIndex) => {
        const seatType = hallData.seatLayout[rowIndex][seatIndex].type;
        const seatData = Seats.find((seat) => seat.name === seatTypes[seatType]);

        if (!hallData.seatLayout[rowIndex][seatIndex].occupied) {
            setSelectedSeats((prevSelectedSeats) => {
                const seatKey = `${rowIndex}-${seatIndex}`;
                if (prevSelectedSeats.includes(seatKey)) {
                    return prevSelectedSeats.filter((key) => key !== seatKey);
                } else {
                    return [...prevSelectedSeats, seatKey];
                }
            });
        }
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
                    <img src="./images/theater-screen.png" />
                    <div className="seat-set">
                        {hallData &&
                            hallData.seatLayout.map((row, rowIndex) => (
                                <div key={rowIndex} className="seat-row">
                                    {row.map((seat, seatIndex) => {
                                        const seatType = seatTypes[seat.type];
                                        const seatData = Seats.find((seatData) => seatData.name === seatType);

                                        const alphabetIndex = hallData.seatLayout.length - rowIndex - 1;
                                        const alphabet = String.fromCharCode(65 + alphabetIndex);

                                        const leftSeatNumber = seatIndex * 2 + 1;
                                        const rightSeatNumber = seatIndex * 2 + 2;

                                        const leftSeatName = `${alphabet}${leftSeatNumber}`;
                                        const rightSeatName = `${alphabet}${rightSeatNumber}`;

                                        return (
                                            <div key={seatIndex} className={`seat-pair ${selectedSeats.includes(`${rowIndex}-${seatIndex}`) ? "selected" : ""}`}>
                                                <div className="seat" onClick={() => handleSeatSelection(rowIndex, seatIndex)}>
                                                    <img
                                                        src={
                                                            seat.occupied
                                                                ? seatData.position[0].seat[2].occupied
                                                                : selectedSeats.includes(`${rowIndex}-${seatIndex}`)
                                                                    ? seatData.position[0].seat[1].chosen
                                                                    : seatData.position[0].seat[0].vacant
                                                        }
                                                        alt={`Left Seat ${rowIndex}-${seatIndex}`}
                                                    />
                                                    <div className={`seat-name ${seat.occupied ? "occupied" : ""}`}>
                                                        {leftSeatName}
                                                    </div>
                                                </div>
                                                <div className="seat" onClick={() => handleSeatSelection(rowIndex, seatIndex)}>
                                                    <img
                                                        src={
                                                            seat.occupied
                                                                ? seatData.position[1].seat[2].occupied
                                                                : selectedSeats.includes(`${rowIndex}-${seatIndex}`)
                                                                    ? seatData.position[1].seat[1].chosen
                                                                    : seatData.position[1].seat[0].vacant
                                                        }
                                                        alt={`Right Seat ${rowIndex}-${seatIndex}`}
                                                    />
                                                    <div className={`seat-name ${seat.occupied ? "occupied" : ""}`}>
                                                        {rightSeatName}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                    </div>
                    <div className="seat-summary">
                        {seatTypes.map((seatType, index) => {
                            const seatData = Seats.find((seat) => seat.name === seatType);
                            if (!seatData) return null;
                            const formattedPrice = Number(seatData.price).toLocaleString();

                            return (
                                seatAmounts[index] > 0 && (
                                    <div key={index} className="seat-info">
                                        <div className="seat-info-item">
                                            {`${seatData.name} (${seatData.seats} Seats)`}
                                        </div>
                                        <div className="seat-info-item">
                                            Seat No. <span>{seatAmounts[index]}</span>
                                        </div>
                                        <div className="seat-info-item">
                                            Price: <span>{`${formattedPrice} Baht`}</span>
                                        </div>
                                    </div>
                                )
                            );
                        })}
                    </div>
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

            {showAlert && (
                <AlertBox
                    messages={["Please select a seat."]}
                    onClose={() => setShowAlert(false)}
                />
            )}
        </div>
    );
};

export default Booking;
