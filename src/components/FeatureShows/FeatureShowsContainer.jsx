import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { Tooltip } from 'react-tooltip';
import AlertBox from '../AlertBox/AlertBox';

const FeatureShowsContainer = ({ MovieData, isScreenTimePast, currentScreenTimeIndex }) => {
    const [showAlert, setShowAlert] = useState(false);
    const currentTime = new Date();

    const canNavigate = (screenTime) => {
        const screenTimeDate = new Date();
        const [hours, minutes] = screenTime.split(':');
        screenTimeDate.setHours(hours, minutes, 0, 0);

        const timeDifference = screenTimeDate.getTime() - currentTime.getTime();
        return timeDifference >= 60 * 60 * 1000;
    };

    return (
        <div className="feature-show-container">
            <div className="feature-shows-container">
                <div className="feature-show-block">
                    <a className="movie-cover-link">
                        <img className="movie-cover" src={MovieData.movieCover} alt={MovieData.movieName} />
                    </a>
                    <div className="movie-info">
                        <div className="movie-name">{MovieData.movieName.toUpperCase()}</div>
                        <div className="movie-time">
                            <img className="clock-icon" src="./images/clock.png" />
                            <div className="movie-length">{MovieData.movieLength} Min</div>
                        </div>
                        <div className="movie-info-icons">
                            <img className="movie-rating" src="./images/rate-general.png" />
                            <img className="clock-movie-type" src="./images/type-digital.png" />
                        </div>
                    </div>
                </div>
                <div className="screen-time-container">
                    {MovieData.screenTime.map((screen, index) => {
                        const boxId = isScreenTimePast(screen.time) ? 'past' : 'future';
                        const hallTypeStyle = {
                            backgroundImage: `url(./images/hilight-hall-${screen.hall}.png)`,
                        };

                        if (boxId === 'future' && currentScreenTimeIndex === null) {
                            currentScreenTimeIndex = index;
                        }

                        const shouldNavigate = canNavigate(screen.time);

                        return (
                            <div
                                key={index}
                                data-tooltip-id="message-box"
                                data-tooltip-content={`Audio: ${MovieData.movieAudio} / Subtitles: ${MovieData.movieSubtitles}`}
                            >
                                <NavLink
                                    to={shouldNavigate ? "/select-ticket" : "#"}
                                    key={index}
                                    className="screen-time-box"
                                    id={currentScreenTimeIndex === index ? 'current' : boxId}
                                    onClick={(event) => {
                                        if (!shouldNavigate && !isScreenTimePast(screen.time)) {
                                            event.preventDefault();
                                            setShowAlert(true);
                                        }
                                    }}
                                >
                                    <div className="hall-type" style={hallTypeStyle}></div>
                                    <div className="screen-time">{screen.time}</div>
                                    <div className="movie-type">{MovieData.movieType}</div>
                                </NavLink>
                            </div>
                        );
                    })}
                </div>
            </div>
            <Tooltip id="message-box" />

            {showAlert && (
                <AlertBox
                    messages={[
                        "You may only reserve/buy tickets at least 60 minutes before showtime.",
                        "Please call 02-160-5999 for more information."
                    ]}
                    onClose={() => setShowAlert(false)}
                />
            )}
        </div>
    );
};

export default FeatureShowsContainer;