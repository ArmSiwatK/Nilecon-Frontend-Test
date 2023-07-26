import React from 'react';
import FeatureShowsContainer from './FeatureShowsContainer';
import MovieData from '../../assets/MovieData.json';
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
                <FeatureShowsContainer
                    MovieData={MovieData}
                    isScreenTimePast={isScreenTimePast}
                    currentScreenTimeIndex={currentScreenTimeIndex}
                />
                <FeatureShowsContainer
                    MovieData={MovieData}
                    isScreenTimePast={isScreenTimePast}
                    currentScreenTimeIndex={currentScreenTimeIndex}
                />
                <FeatureShowsContainer
                    MovieData={MovieData}
                    isScreenTimePast={isScreenTimePast}
                    currentScreenTimeIndex={currentScreenTimeIndex}
                />
            </div>
        </div>
    );
};

export default FeatureShows;
