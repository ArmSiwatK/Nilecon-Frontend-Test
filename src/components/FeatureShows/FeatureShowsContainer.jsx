import React, { useState } from 'react';

const FeatureShowsContainer = ({ movieData, isScreenTimePast, currentScreenTimeIndex }) => {
    const [currentHoverIndex, setCurrentHoverIndex] = useState(null);

    const handleMouseEnter = (index) => {
        setCurrentHoverIndex(index);
    };

    const handleMouseLeave = () => {
        setCurrentHoverIndex(null);
    };

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
                            <div className="movie-length">{movieData.movieLength} MIN</div>
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
                                key={index}
                                className="screen-time-box"
                                id={currentScreenTimeIndex === index ? 'current' : boxId}
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <div className="hall-type" style={hallTypeStyle}></div>
                                <a>
                                    <div className="screen-time">{screen.time}</div>
                                </a>
                                <div className="movie-type">{movieData.movieType}</div>

                                {currentHoverIndex === index && (
                                    <div className="message-box">
                                        Audio: {movieData.movieAudio} / Subtitles: {movieData.movieSubtitles}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default FeatureShowsContainer;