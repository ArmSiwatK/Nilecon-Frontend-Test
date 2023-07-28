import React, { useState, useContext } from 'react';
import { ScreenContext } from '../../ScreenContext';
import BookingInfo from './BookingInfo';
import SeatChoices from './SeatChoices';
import SeatPosition from './SeatPosition';
import { getAvailableSeatsByType, selectSeats } from './SeatHelpers';
import AlertBox from '../AlertBox/AlertBox';
import Halls from '../../assets/Halls.json';
import './Booking.scss';

const Booking = () => {
    const { selectedScreen } = useContext(ScreenContext);

    const hallData = Halls.find((hall) => hall.number === selectedScreen.hall);
    const seatTypes = hallData ? hallData.seatTypes : [];

    const [currentStep, setCurrentStep] = useState(1);
    const [seatAmounts, setSeatAmounts] = useState(seatTypes.map(() => 0));
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [showAlert, setShowAlert] = useState(0);

    const handleGoBack = () => {
        currentStep === 1 ? window.history.back() : setCurrentStep((prevStep) => prevStep - 1);
    };

    const handleNextStep = () => {
        const availableSeatsByType = getAvailableSeatsByType(hallData, seatTypes);
        const isAnySeatAmountExceeded = seatAmounts.some((amount, index) => amount > availableSeatsByType[seatTypes[index]].length);

        if (isAnySeatAmountExceeded) {
            setShowAlert(2);
            return;
        }

        const selectedSeats = selectSeats(seatTypes, seatAmounts, availableSeatsByType);
        selectedSeats.length === 0 ? setShowAlert(1) : setSelectedSeats(selectedSeats.map(({ rowIndex, seatIndex }) => `${rowIndex}-${seatIndex}`));
        setCurrentStep((prevStep) => prevStep + 1);
    };

    const handleSeatAmountChange = (index, amount) => {
        const newSeatAmounts = [...seatAmounts];
        const newAmount = Math.min(Math.max(newSeatAmounts[index] + amount, 0), 3);
        newSeatAmounts[index] = newAmount;
        setSeatAmounts(newSeatAmounts);
    };

    const handleSeatSelection = (rowIndex, seatIndex) => {
        const { occupied, type } = hallData.seatLayout[rowIndex][seatIndex];

        if (!occupied) {
            const selectedSeatKey = `${rowIndex}-${seatIndex}`;
            const isAlreadySelected = selectedSeats.includes(selectedSeatKey);

            const selectedSeatsOfType = selectedSeats.filter(key => {
                const [selectedRowIndex, selectedSeatIndex] = key.split('-');
                return hallData.seatLayout[selectedRowIndex][selectedSeatIndex].type === type;
            });

            if (isAlreadySelected) {
                setSelectedSeats((prevSelectedSeats) => prevSelectedSeats.filter((key) => key !== selectedSeatKey));
            } else if (selectedSeatsOfType.length < seatAmounts[type]) {
                setSelectedSeats((prevSelectedSeats) => [...prevSelectedSeats, selectedSeatKey]);
            }
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
                <SeatPosition
                    selectedSeats={selectedSeats}
                    seatTypes={seatTypes}
                    handleSeatSelection={handleSeatSelection}
                    seatAmounts={seatAmounts}
                    hallData={hallData}
                />
            )}

            <img className="title-confirm" src="./images/confirm-booking.png" />

            {currentStep === 3 && (
                <div className="confirmation">
                    {/* Confirmation rendering */}
                </div>
            )}

            {currentStep === 1 && (
                <div className="bottom-button">
                    <input type="image" src="./images/btn-seat-next.png" alt="Next" onClick={handleNextStep} />
                </div>
            )}

            {currentStep === 2 && (
                <div className="bottom-button">
                    <input type="image" src="./images/btn-seat-prev.png" alt="Prev" onClick={handleGoBack} />
                </div>
            )}

            {showAlert === 1 && (
                <AlertBox
                    messages={["Please select a seat."]}
                    onClose={() => setShowAlert(false)}
                />
            )}

            {showAlert === 2 && (
                <AlertBox
                    messages={["Selected seat amount exceeds availability."]}
                    onClose={() => setShowAlert(false)}
                />
            )}
        </div>
    );
};

export default Booking;
