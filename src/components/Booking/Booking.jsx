/*
<--------------- Imports --------------->
*/

import React, { useState, useEffect, useContext } from 'react';
import { ScreenContext } from '../../ScreenContext';
import BookingInfo from './BookingInfo';
import SeatChoices from './SeatChoices';
import SeatPosition from './SeatPosition';
import ConfirmBooking from './ConfirmBooking';
import { formattedDate, getAvailableSeatsByType, selectSeats } from './SeatHelpers';
import AlertBox from '../AlertBox/AlertBox';
import Halls from '../../assets/Halls.json';
import MovieData from '../../assets/MovieData.json';
import Seats from '../../assets/Seats.json';
import './Booking.scss';

/*
<--------------- Component --------------->
*/

const Booking = () => {

    /*
    <--------------- Context, Variables, and States --------------->
    */

    const { selectedScreen } = useContext(ScreenContext);

    const hallData = Halls.find((hall) => hall.number === selectedScreen.hall);
    const seatTypes = hallData ? hallData.seatTypes : [];
    const lastScreenTime = selectedScreen || MovieData.screenTime[MovieData.screenTime.length - 1];

    const [currentStep, setCurrentStep] = useState(1);
    const [seatAmounts, setSeatAmounts] = useState(seatTypes.map(() => 0));
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [selectedSeatNames, setSelectedSeatNames] = useState([]);
    const [showAlert, setShowAlert] = useState(0);

    const [nameError, setNameError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [phoneError, setPhoneError] = useState(null);

    const [formData, setFormData] = useState({
        name: null,
        email: null,
        phone: null,
    });

    const totalPrice = selectedSeats
        .map(selectedSeat => {
            const [rowIndex, seatIndex] = selectedSeat.split('-');
            const seatType = hallData.seatLayout[rowIndex][seatIndex].type;
            const seatData = Seats.find(seat => seat.name === seatTypes[seatType]);
            return seatData ? parseFloat(seatData.price) : 0;
        })
        .reduce((total, price) => total + price, 0);

    /*
    <--------------- Navigation Functions --------------->
    */

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

    const handleReserveSeats = () => {
        setCurrentStep(3);
    };

    /*
    <--------------- Seat Functions --------------->
    */

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

            const selectedSeatsOfType = selectedSeats.filter((key) => {
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

    /*
    <--------------- Form Function --------------->
    */

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        const errorMessages = {
            name: !value ? '* This field is required' : null,
            email: !value ? '* This field is required' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid email address' : null,
            phone: !value ? '* This field is required' : value.length < 9 ? 'Minimum 9 characters' : !/^\d+$/.test(value) ? 'Not a valid integer' : null,
        };

        switch (name) {
            case 'name':
                setFormData((prevFormData) => ({ ...prevFormData, name: value }));
                setNameError(errorMessages.name);
                break;
            case 'email':
                setFormData((prevFormData) => ({ ...prevFormData, email: value }));
                setEmailError(errorMessages.email);
                break;
            case 'phone':
                setFormData((prevFormData) => ({ ...prevFormData, phone: value }));
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

    /*
    <--------------- useEffect Hook --------------->
    */

    useEffect(() => {
        const newSelectedSeatNames = selectedSeats.map((selectedSeat) => {
            const [rowIndex, seatIndex] = selectedSeat.split('-');
            const seat = hallData.seatLayout[rowIndex][seatIndex];
            if (!seat.occupied) {
                const alphabetIndex = hallData.seatLayout.length - rowIndex - 1;
                const alphabet = String.fromCharCode(65 + alphabetIndex);
                const leftSeatNumber = seatIndex * 2 + 1;
                const rightSeatNumber = seatIndex * 2 + 2;
                return `${alphabet}${leftSeatNumber}, ${alphabet}${rightSeatNumber}`;
            }
            return null;
        });

        setSelectedSeatNames(newSelectedSeatNames.filter((seatName) => seatName !== null));
    }, [selectedSeats, hallData]);

    /*
    <--------------- JSX Structure --------------->
    */

    return (
        <div className="booking-container">
            <div className="back-button">
                <input type="image" src="./images/btn-back.png" onClick={handleGoBack} alt="Back" />
            </div>

            <BookingInfo
                lastScreenTime={lastScreenTime}
                formattedDate={formattedDate}
            />

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
                    selectedSeatNames={selectedSeatNames}
                    seatTypes={seatTypes}
                    handleSeatSelection={handleSeatSelection}
                    seatAmounts={seatAmounts}
                    hallData={hallData}
                />
            )}

            {currentStep === 2 && (
                <ConfirmBooking
                    nameError={nameError}
                    emailError={emailError}
                    phoneError={phoneError}
                    handleInputChange={handleInputChange}
                    handleReserveSeats={handleReserveSeats}
                />
            )}

            {currentStep === 3 && (
                <div className="confirmation">
                    <img src="./images/booking-completed.png" />
                    <div className="confirm-movie-info">
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
                                <div className="movie-details-cell"><span>Hall:</span> {lastScreenTime.hall}</div>
                                <div className="movie-details-cell"><span>Total Price:</span> {totalPrice.toLocaleString()} Baht</div>
                                <div className="movie-details-cell"><span>Time:</span> {lastScreenTime.time}</div>
                                <div className="movie-details-cell"><span>Seat No.</span> {selectedSeatNames.join(', ')}</div>
                                <div className="movie-details-cell"></div>
                                <div className="movie-details-cell"><span>Your Name:</span> {formData.name}</div>
                                <div className="movie-details-cell"><span>Phone No.</span> {formData.phone}</div>
                                <div className="movie-details-cell"><span>Booking No.</span> {lastScreenTime.hall}</div>
                            </div>
                        </div>
                    </div>
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
