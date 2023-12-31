import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Tooltip } from 'react-tooltip';
import Seats from '../../../assets/Seats.json';
import "../styles/SeatPosition.scss";

const SeatPosition = ({
    selectedSeats,
    selectedSeatNames,
    seatTypes,
    handleSeatSelection,
    seatAmounts,
    hallData,
}) => {
    return (
        <div className="seat-position">
            <img className="theater-screen" src="./images/theater-screen.png" />
            <div className="seat-set">
                {hallData &&
                    hallData.seatLayout.map((row, rowIndex) => (
                        <div key={rowIndex} className="seat-row">
                            <div className="arrow left">
                                {String.fromCharCode(65 + hallData.seatLayout.length - rowIndex - 1)}
                            </div>
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
                                    <div
                                        key={seatIndex}
                                        className={`seat-pair ${selectedSeats.includes(`${rowIndex}-${seatIndex}`) ? "selected" : ""}`}
                                        data-tooltip-id="preview-box"
                                        data-tooltip-html={ReactDOMServer.renderToStaticMarkup(<img src={seatData.preview} />)}
                                    >
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
                            <div className="arrow right">
                                {String.fromCharCode(65 + hallData.seatLayout.length - rowIndex - 1)}
                            </div>
                        </div>
                    ))}
                <Tooltip id="preview-box" />
            </div>
            <div className="seat-summary">
                {seatTypes.map((seatType, index) => {
                    const seatData = Seats.find((seat) => seat.name === seatType);
                    if (!seatData) return null;
                    const formattedPrice = Number(seatData.price).toLocaleString();
                    const seatInstances = Array.from({ length: seatAmounts[index] }, (_, i) => i);

                    return (
                        seatInstances.map((instanceIndex) => (
                            <div key={`${seatType}-${instanceIndex}`} className="seat-info">
                                <div className="seat-info-item">
                                    {`${seatData.name} (${seatData.seats} Seats)`}
                                </div>
                                <div className="seat-info-item">
                                    Seat No. <span>{selectedSeatNames[instanceIndex]}</span>
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
    );
};

export default SeatPosition;
