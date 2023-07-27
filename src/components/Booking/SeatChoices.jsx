import React from 'react';
import Seats from '../../assets/Seats.json';

const SeatChoices = ({ seatTypes, seatAmounts, handleSeatAmountChange }) => {
    return (
        <div className="seat-choices">
            {seatTypes.map((seatType, index) => {
                const seatData = Seats.find((seat) => seat.name === seatType);
                if (!seatData) return null;

                const formattedPrice = Number(seatData.price).toLocaleString();

                return (
                    <div key={index} className="seat-info">
                        <img className="seat-image" src={seatData.profile} alt={seatData.name} />
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
    );
};

export default SeatChoices;
