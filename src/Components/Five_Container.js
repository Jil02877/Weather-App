import React from 'react';
import WeatherIcon from './WeatherIcon';

const Five_Container = ({ weather, date, day }) => {
    console.log('For_Container Props:', { date, day, weather });

    return (
        <div className="Main w-full md:w-1/3 lg:w-1/4 flex flex-col gap-2 bg-white p-4 md:p-6 text-center items-center justify-center">
            {/* Weather Description */}
            <div className="description_Weather m-2 text-xl md:text-2xl font-semibold text-gray-800">
                <p>{weather ? weather[0].description : 'No description available'}</p>
            </div>

            {/* Weather Icon */}
            <div className="Weather_Report">
                <WeatherIcon iconName={weather ? weather[0].icon : ''} />
            </div>

            {/* Day Info */}
            <div className="Time text-lg md:text-xl font-medium text-gray-600">
                <p>{day}</p>
            </div>

            {/* Date Info */}
            <div className="Date text-sm md:text-base text-gray-500">
                <span>{date}</span>
            </div>
        </div>
    );
};

export default Five_Container;
