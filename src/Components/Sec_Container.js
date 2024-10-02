import React from 'react';
import WeatherIcon from './WeatherIcon';

const Sec_Container = ({ weather }) => {
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
        </div>
    );
};

export default Sec_Container;
