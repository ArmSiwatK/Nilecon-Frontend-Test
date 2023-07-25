import React from 'react';
import { Tooltip } from 'react-tooltip';

const FeatureShowsContainer = ({ movieData, isScreenTimePast, currentScreenTimeIndex }) => {
    return (
        <div className="feature-show-container">
            <div className="feature-shows-container">
                <div className="feature-show-block">
                    <a className="movie-cover-link">
                        <img className="movie-cover" src={movieData.movieCover} alt={movieData.movieName} />
                    </a>
                    <div className="movie-info">
                        <div className="movie-name">{movieData.movieName.toUpperCase()}</div>
                        <div className="movie-time">
                            <img className="clock-icon" src="./images/clock.png" />
                            <div className="movie-length">{movieData.movieLength} Min</div>
                        </div>
                        <div className="movie-info-icons">
                            <img className="movie-rating" src="./images/rate-general.png" />
                            <img className="clock-movie-type" src="./images/type-digital.png" />
                        </div>
                    </div>
                </div>
                <div className="screen-time-container">
                    {movieData.screenTime.map((screen, index) => {
                        const boxId = isScreenTimePast(screen.time) ? 'past' : 'future';
                        const hallTypeStyle = {
                            backgroundImage: `url(./images/hilight-hall-${screen.hall}.png)`,
                        };


                        if (boxId === 'future' && currentScreenTimeIndex === null) {
                            currentScreenTimeIndex = index;
                        }

                        return (
                            <div
                                data-tooltip-id="message-box"
                                data-tooltip-content={`Audio: ${movieData.movieAudio} / Subtitles: ${movieData.movieSubtitles}`}
                            >
                                <div
                                    key={index}
                                    className="screen-time-box"
                                    id={currentScreenTimeIndex === index ? 'current' : boxId}
                                >
                                    <div className="hall-type" style={hallTypeStyle}></div>
                                    <a>
                                        <div className="screen-time">{screen.time}</div>
                                    </a>
                                    <div className="movie-type">{movieData.movieType}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <Tooltip id="message-box" />
        </div>
    );
};

export default FeatureShowsContainer;