import React from 'react';
import "../styles/ConfirmBooking.scss";

const ConfirmBooking = ({ nameError, emailError, phoneError, handleInputChange, handleReserveSeats }) => {
    return (
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
    );
};

export default ConfirmBooking;
