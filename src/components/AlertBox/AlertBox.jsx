import React from 'react';
import "./AlertBox.scss";

const AlertBox = ({ messages, onClose }) => {
    return (
        <div className="alert-box">
            <div className="alert-content">
                <div className="close-button" onClick={onClose}></div>
                {messages.map((message, index) => (
                    <div key={index}>{message}</div>
                ))}
            </div>
        </div>
    );
};

export default AlertBox;
