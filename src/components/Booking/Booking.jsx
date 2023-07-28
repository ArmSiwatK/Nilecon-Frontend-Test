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

    const [nameError, setNameError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [phoneError, setPhoneError] = useState(null);

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        const errorMessages = {
            name: !value ? '* This field is required' : null,
            email: !value ? '* This field is required' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid email address' : null,
            phone: !value ? '* This field is required' : value.length < 9 ? 'Minimum 9 characters' : !/^\d+$/.test(value) ? 'Not a valid integer' : null,
        };

        switch (name) {
            case 'name':
                setNameError(errorMessages.name);
                break;
            case 'email':
                setEmailError(errorMessages.email);
                break;
            case 'phone':
                setPhoneError(errorMessages.phone);
                break;
            default:
                break;
        }

        const isFormValid = !errorMessages.name && !errorMessages.email && !errorMessages.phone;
        const reserveButton = document.getElementById('reserve');
        if (reserveButton) {
            reserveButton.disabled = !isFormValid;
        }
    };


    const handleReserveSeats = () => {
        setCurrentStep(3);
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

            {currentStep === 2 && (
                <div className="confirm-booking">
                    <img className="confirm-title" src="./images/confirm-booking.png" />
                    <div className="confirm-input">

                        <div className="input-container">
                            <input
                                type="text"
                                className={`input-box ${nameError ? 'invalid' : ''}`}
                                id="name"
                                name="name"
                                placeholder="Your Name"
                                required
                                onChange={handleInputChange}
                            />
                            {nameError && <div className="error-message">{nameError}</div>}
                        </div>

                        <div className="input-container">
                            <input
                                type="email"
                                className={`input-box ${emailError ? 'invalid' : ''}`}
                                id="email"
                                name="email"
                                placeholder="Your Email"
                                required
                                onChange={handleInputChange}
                            />
                            {emailError && <div className="error-message">{emailError}</div>}
                        </div>

                        <div className="input-container">
                            <input
                                type="tel"
                                className={`input-box ${phoneError ? 'invalid' : ''}`}
                                id="phone"
                                name="phone"
                                placeholder="Phone No."
                                required
                                onChange={handleInputChange}
                            />
                            {phoneError && <div className="error-message">{phoneError}</div>}
                        </div>

                        <label>
                            <input type="checkbox" id="remember-me" name="remember-me" />
                            <span>Remember Me</span>
                        </label>

                        <input
                            type="image"
                            id="reserve"
                            src="./images/btn-reserve.png"
                            alt="Reserve"
                            value="Reserve"
                            disabled={nameError || emailError || phoneError}
                            onClick={handleReserveSeats}
                        />
                    </div>
                </div>
            )}

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
