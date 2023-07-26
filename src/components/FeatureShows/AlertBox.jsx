import React from 'react';
import "./AlertBox.scss";

const AlertBox = ({ message1, message2, onClose }) => {
    return (
        <div className="alert-box">
            <div className="alert-content">
                <div className="close-button" onClick={onClose}></div>
                <div>{message1}</div>
                <div>{message2}</div>
            </div>
        </div>
    );
};

export default AlertBox;
