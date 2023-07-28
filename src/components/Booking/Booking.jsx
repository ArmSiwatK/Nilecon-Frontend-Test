import React, { useState, useContext } from 'react';
import { ScreenContext } from '../../ScreenContext';
import BookingInfo from './BookingInfo';
import SeatChoices from './SeatChoices';
import SeatPosition from './SeatPosition';
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
        if (currentStep === 1) {
            window.history.back();
        } else {
            setCurrentStep((prevStep) => prevStep - 1);
        }
    };

    const handleNextStep = () => {
        const availableSeatsByType = getAvailableSeatsByType();
        const isAnySeatAmountExceeded = seatAmounts.some((amount, index) => amount > availableSeatsByType[seatTypes[index]].length);

        if (isAnySeatAmountExceeded) {
            setShowAlert(2);
            return;
        }

        const selectedSeats = selectSeats(availableSeatsByType);
        if (selectedSeats.length === 0) {
            setShowAlert(1);
            return;
        }

        setSelectedSeats(selectedSeats.map(({ rowIndex, seatIndex }) => `${rowIndex}-${seatIndex}`));
        setCurrentStep((prevStep) => prevStep + 1);
    };

    const handleSeatAmountChange = (index, amount) => {
        const newSeatAmounts = [...seatAmounts];
        const newAmount = Math.min(Math.max(newSeatAmounts[index] + amount, 0), 3);
        newSeatAmounts[index] = newAmount;
        setSeatAmounts(newSeatAmounts);
    };

    const handleSeatSelection = (rowIndex, seatIndex) => {
        if (!hallData.seatLayout[rowIndex][seatIndex].occupied) {
            const selectedSeatKey = `${rowIndex}-${seatIndex}`;
            const isAlreadySelected = selectedSeats.includes(selectedSeatKey);

            const seatType = hallData.seatLayout[rowIndex][seatIndex].type;
            const maxAllowedSeats = seatAmounts[seatType];
            const selectedSeatsOfType = selectedSeats.filter(key => {
                const [selectedRowIndex, selectedSeatIndex] = key.split('-');
                return hallData.seatLayout[selectedRowIndex][selectedSeatIndex].type === seatType;
            });

            if (isAlreadySelected) {
                setSelectedSeats((prevSelectedSeats) =>
                    prevSelectedSeats.filter((key) => key !== selectedSeatKey)
                );
            } else if (selectedSeatsOfType.length < maxAllowedSeats) {
                setSelectedSeats((prevSelectedSeats) => [...prevSelectedSeats, selectedSeatKey]);
            }
        }
    };

    const getAvailableSeatsByType = () => {
        const availableSeatsByType = {};
        hallData.seatLayout.forEach((row, rowIndex) => {
            row.forEach((seat, seatIndex) => {
                if (!seat.occupied) {
                    const seatType = seatTypes[seat.type];
                    if (!availableSeatsByType[seatType]) {
                        availableSeatsByType[seatType] = [];
                    }
                    availableSeatsByType[seatType].push({ rowIndex, seatIndex });
                }
            });
        });
        return availableSeatsByType;
    };

    const selectSeats = (availableSeatsByType) => {
        const totalSeatsNeeded = seatAmounts.reduce((acc, amount) => acc + amount, 0);
        const selectedSeats = [];

        for (let i = 0; i < totalSeatsNeeded; i++) {
            let selectedSeat = null;

            for (let typeIndex = 0; typeIndex < seatTypes.length; typeIndex++) {
                const seatType = seatTypes[typeIndex];
                const maxAllowedSeats = seatAmounts[typeIndex];
                const selectedSeatsOfType = selectedSeats.filter(({ seatType }) => seatType === typeIndex);

                if (selectedSeatsOfType.length < maxAllowedSeats) {
                    const availableSeatsOfType = availableSeatsByType[seatType];
                    if (availableSeatsOfType && availableSeatsOfType.length > 0) {
                        const randomAvailableSeatIndex = Math.floor(Math.random() * availableSeatsOfType.length);
                        selectedSeat = availableSeatsOfType[randomAvailableSeatIndex];
                        availableSeatsOfType.splice(randomAvailableSeatIndex, 1);
                        selectedSeats.push({ ...selectedSeat, seatType: typeIndex });
                        break;
                    }
                }
            }

            if (selectedSeat === null) {
                selectedSeats.forEach(({ rowIndex, seatIndex, seatType }) => {
                    availableSeatsByType[seatTypes[seatType]].push({ rowIndex, seatIndex });
                });
                selectedSeats.length = 0;
                i = -1;
            }
        }

        return selectedSeats;
    };

    const getSelectedSeatNames = (selectedSeats, seatType) => {
        return selectedSeats
            .map((selectedSeat) => {
                const [rowIndex, seatIndex] = selectedSeat.split('-');
                const seat = hallData.seatLayout[rowIndex][seatIndex];
                if (seatTypes[seat.type] === seatType) {
                    const alphabetIndex = hallData.seatLayout.length - rowIndex - 1;
                    const alphabet = String.fromCharCode(65 + alphabetIndex);
                    const leftSeatNumber = seatIndex * 2 + 1;
                    const rightSeatNumber = seatIndex * 2 + 2;
                    return `${alphabet}${leftSeatNumber}, ${alphabet}${rightSeatNumber}`;
                }
                return null;
            })
            .filter((seatName) => seatName !== null);
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
