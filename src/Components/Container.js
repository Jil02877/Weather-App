import { format, parseISO } from 'date-fns'
import React from 'react'
import WeatherIcon from './WeatherIcon'

const Container = ({ main, list }) => {
    return (
        <div className='bg-white w-full flex flex-wrap md:flex-nowrap overflow-x-auto gap-3 md:gap-6 justify-evenly items-center space-y-4 md:space-y-2 text-center p-4'>
            {/* This is for temp */}
            <div className='weather_temp mx-5 w-full md:w-auto'>
                <div className="weather_temp_main space-y-2">
                    <p className='text-4xl md:text-5xl font-medium'>
                        {main?.temp ? ` ${(main.temp - 273.15).toFixed(2)}°` : 'No temperature available'}
                    </p>
                    <p className='text-gray-400'>
                        {main?.feels_like ? `Feels Like ${(main.feels_like - 273.15).toFixed(2)}°` : "No temperature available"}
                    </p>
                </div>
                <div className="weather_temp_sub flex gap-2 justify-center text-gray-400">
                    <p>{main?.temp_max ? `${(main.temp_max - 273.15).toFixed(2)}°↑` : 'N/A'}</p>
                    <p>{main?.temp_min ? `${(main.temp_min - 273.15).toFixed(2)}°↓` : 'N/A'}</p>
                </div>
            </div>

            {/* Weather Data with Time */}
            <div className="weather_data_with_time w-full md:w-auto">
                <div className="time flex flex-wrap md:flex-nowrap justify-between items-center gap-4 md:gap-6 whitespace-nowrap text-sm md:text-md font-medium text-gray-600">
                    {list?.map((d, i) => (
                        <div key={i} className='min-w-[80px]'>
                            <p className='text-center'>{format(parseISO(d.dt_txt), "h:mm a")}</p>
                            <WeatherIcon iconName={d.weather[0].icon} />
                            <p className='text-center'>
                                {d?.main.temp ? `${(d?.main.temp - 273.15).toFixed(2)}°` : 'N/A'}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Container;
