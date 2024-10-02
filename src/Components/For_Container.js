import React from 'react'
import { FaEye } from "react-icons/fa";
import { MdOutlineWaterDrop } from "react-icons/md";
import { FaWind } from "react-icons/fa";
import { ImMeter } from "react-icons/im";
import { FiSunrise } from "react-icons/fi";
import { FiSunset } from "react-icons/fi";
import format from 'date-fns/format';
import { fromUnixTime } from 'date-fns';
import Five_Container from './Five_Container';

const For_Container = ({ visibility, main, wind, city, weather, date, day }) => {
    return (
        <div className='flex flex-col items-center w-full bg-white p-4 gap-6'>
            {/* For Condition of Weather */}
            <div className="Weather_Condition flex justify-center">
                <Five_Container  weather={weather} date={date} day={day} />
            </div>

            {/* Temperature Info */}
            <div className='weather_temp mx-5 text-center'>
                <div className="weather_temp_main space-y-1">
                    <p className='text-5xl font-medium'>{main?.temp ? ` ${(main.temp - 273.15).toFixed(2)}°C` : 'No temperature available'}</p>
                    <p className='text-gray-400'>{main?.feels_like ? `Feels Like ${(main.feels_like - 273.15).toFixed(2)}°C` : "No temperature available"}</p>
                </div>
                <div className="weather_temp_sub flex gap-2 justify-center text-gray-400">
                    <p>{main?.temp_max ? `${(main.temp_max - 273.15).toFixed(2)}°C↑` : 'No temperature available'}</p>
                    <p>{main?.temp_min ? `${(main.temp_min - 273.15).toFixed(2)}°C↓` : 'No temperature available'}</p>
                </div>
            </div>

            {/* Weather details displayed in columns for larger screens */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10  w-full text-center font-medium">
                {/* Visibility */}
                <div className="flex flex-col items-center gap-2">
                    <span className='font-bold'>Visibility</span>
                    <FaEye className="text-black text-3xl" />
                    <span>{visibility ? `${(visibility / 1000).toFixed(2)} km` : 'N/A'}</span>
                </div>

                {/* Humidity */}
                <div className="flex flex-col items-center gap-2">
                    <span className='font-bold'>Humidity</span>
                    <MdOutlineWaterDrop className="text-black text-3xl" />
                    <span>{main?.humidity ? `${main?.humidity}%` : 'N/A'}</span>
                </div>

                {/* Wind Speed */}
                <div className="flex flex-col items-center gap-2">
                    <span className='font-bold'>Wind Speed</span>
                    <FaWind className="text-black text-3xl" />
                    <span>{wind?.speed ? `${(wind.speed * 3.6).toFixed(2)} km/h` : 'N/A'}</span>
                </div>

                {/* Pressure */}
                <div className="flex flex-col items-center gap-2">
                    <span className='font-bold'>Pressure</span>
                    <ImMeter className="text-black text-3xl" />
                    <span>{main?.pressure ? `${main?.pressure} hPa` : 'N/A'}</span>
                </div>

                {/* Sunrise */}
                <div className="flex flex-col items-center gap-2">
                    <span className='font-bold'>Sunrise</span>
                    <FiSunrise className="text-black text-3xl" />
                    <span>
                        {city?.sunrise
                            ? format(fromUnixTime(city.sunrise), 'H:mm')
                            : 'N/A'}
                    </span>
                </div>

                {/* Sunset */}
                <div className="flex flex-col items-center gap-2">
                    <span className='font-bold'>Sunset</span>
                    <FiSunset className="text-black text-3xl" />
                    <span>
                        {city?.sunset
                            ? format(fromUnixTime(city.sunset), 'H:mm')
                            : 'N/A'}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default For_Container;
