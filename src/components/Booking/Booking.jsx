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
        const selectedSeatPairs = selectedSeats
            .map((selectedSeat) => {
                const [rowIndex, seatIndex] = selectedSeat.split('-');
                const seat = hallData.seatLayout[rowIndex][seatIndex];
                if (seat.type === seatTypes.indexOf(seatType)) {
                    const alphabetIndex = hallData.seatLayout.length - rowIndex - 1;
                    const alphabet = String.fromCharCode(65 + alphabetIndex);
                    const leftSeatNumber = seatIndex * 2 + 1;
                    const rightSeatNumber = seatIndex * 2 + 2;
                    return `${alphabet}${leftSeatNumber}, ${alphabet}${rightSeatNumber}`;
                }
                return null;
            })
            .filter((seatName) => seatName !== null);

        return selectedSeatPairs.join(', ');
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
                            const seatInstances = Array.from({ length: seatAmounts[index] }, (_, i) => i);
                            const selectedSeatNames = getSelectedSeatNames(selectedSeats, seatType);

                            return (
                                seatInstances.map((instanceIndex) => (
                                    <div key={`${seatType}-${instanceIndex}`} className="seat-info">
                                        <div className="seat-info-item">
                                            {`${seatData.name} (${seatData.seats} Seats)`}
                                        </div>
                                        <div className="seat-info-item">
                                            Seat No. <span>{selectedSeatNames}</span>
                                        </div>
                                        <div className="seat-info-item">
                                            Price: <span>{`${formattedPrice} Baht`}</span>
                                        </div>
                                    </div>
                                ))
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
