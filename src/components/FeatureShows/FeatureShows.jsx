import React from 'react';
import movieData from '../../assets/MovieData.json';
import './FeatureShows.scss';

const FeatureShows = () => {
    const currentTime = new Date();
    const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
    let currentScreenTimeIndex = null;

    const isScreenTimePast = (screenTime) => {
        const [hours, minutes] = screenTime.split(':').map(Number);
        const screenMinutes = hours * 60 + minutes;
        return screenMinutes < currentMinutes;
    };

    return (
        <div className="feature-shows">
            <div className="feature-shows-title">SHOWTIMES</div>
            <div className="feature-shows-list">
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
                            if (boxId === 'future' && currentScreenTimeIndex === null) {
                                currentScreenTimeIndex = index;
                            }
                            return (
                                <div key={index} className="screen-time-box" id={currentScreenTimeIndex === index ? 'current' : boxId}>
                                    <div className="hall-type">{`Hall ${screen.hall}`}</div>
                                    <div className="screen-time">{screen.time}</div>
                                    <div className="movie-type">{movieData.movieType}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeatureShows;
