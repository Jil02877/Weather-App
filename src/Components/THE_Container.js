import React from 'react';
import { FaEye } from "react-icons/fa";
import { MdOutlineWaterDrop } from "react-icons/md";
import { FaWind } from "react-icons/fa";
import { ImMeter } from "react-icons/im";
import { FiSunrise } from "react-icons/fi";
import { FiSunset } from "react-icons/fi";
import format from 'date-fns/format';
import { fromUnixTime } from 'date-fns';

const THE_Container = ({ visibility, main, wind, city }) => {
    return (
        <div className="bg-yellow-400 w-full flex flex-col md:flex-row items-center justify-around p-4 font-medium">
            {/* Visibility */}
            <div className="flex flex-col items-center gap-2 mx-2">
                <span className='font-bold'>Visibility</span>
                <FaEye className="text-black text-3xl" />
                <span>{visibility ? `${(visibility / 1000).toFixed(2)} km` : 'N/A'}</span>
            </div>

            {/* Humidity */}
            <div className="flex flex-col items-center gap-2 mx-2">
                <span className='font-bold'>Humidity</span>
                <MdOutlineWaterDrop className="text-black text-3xl" />
                <span>{main?.humidity ? `${main?.humidity}%` : 'N/A'}</span>
            </div>

            {/* Wind Speed */}
            <div className="flex flex-col items-center gap-2 mx-2">
                <span className='font-bold'>Wind Speed</span>
                <FaWind className="text-black text-3xl" />
                <span>{wind?.speed ? `${(wind.speed * 3.6).toFixed(2)} km/h` : 'N/A'}</span>
            </div>

            {/* Pressure */}
            <div className="flex flex-col items-center gap-2 mx-2">
                <span className='font-bold'>Pressure</span>
                <ImMeter className="text-black text-3xl" />
                <span>{main?.pressure ? `${main?.pressure} hPa` : 'N/A'}</span>
            </div>

            {/* Sunrise */}
            <div className="flex flex-col items-center gap-2 mx-2">
                <span className='font-bold'>Sunrise</span>
                <FiSunrise className="text-black text-3xl" />
                <span>
                    {city?.sunrise
                        ? format(fromUnixTime(city.sunrise), 'H:mm')  // Format if sunrise is available
                        : 'N/A'  // Display 'N/A' if sunrise is not available
                    }
                </span>
            </div>

            {/* Sunset */}
            <div className="flex flex-col items-center gap-2 mx-2">
                <span className='font-bold'>Sunset</span>
                <FiSunset className="text-black text-3xl" />
                <span>
                    {city?.sunset
                        ? format(fromUnixTime(city.sunset), 'H:mm')  // Format if sunset is available
                        : 'N/A'  // Display 'N/A' if sunset is not available
                    }
                </span>
            </div>
        </div>
    );
};

export default THE_Container;
