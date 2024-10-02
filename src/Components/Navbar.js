'use client'
import React from 'react'
import { MdWbSunny } from "react-icons/md";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import SearchBox from './SearchBox';
import { useState } from 'react';
import axios from 'axios'; // Make sure to import axios
import { useAtom, useSetAtom } from 'jotai';
import { placeAtom } from '@/app/atom';
const Navbar = () => {
  const [city, setCity] = useState('')
  const [error, setError] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestion, setShowSuggestion] = useState(false)
  const [weatherDetails, setWeatherDetails] = useState(null); // State to hold weather details
  const [place, setPlace] = useAtom(placeAtom)
  async function handleChange(value) {
    setCity(value)
    if (value.length >= 3) {
      try {
        const res = await axios.get(`http://api.openweathermap.org/data/2.5/find?q=${value}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`);
        const suggestions = res.data.list.map((item) => item.name);
        setSuggestions(suggestions);
        setError('');
        setShowSuggestion(true);
      } catch (error) {
        setSuggestions([]);
        setShowSuggestion(false);
      }
    } else {
      setSuggestions([]);
      setPlace(city)
      setShowSuggestion(false);
    }
  }

  // Function to handle weather details retrieval and display
  async function fetchWeatherDetails(cityName) {
    try {
      const res = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`);
      setWeatherDetails(res.data); // Store weather details in state
      setError(''); // Clear any previous error
    } catch (error) {
      setWeatherDetails(null); // Clear weather details on error
      setError('City not found'); // Set error message
    }
  }

  return (
    <>
      <nav className="icon shadow-sm sticky top-0 left-0 z-50 bg-white border">
        <div className='h-[10vh] w-full flex flex-wrap justify-between items-center max-w-7xl px-3 mx-auto'>
          {/* Logo Section */}
          <div className='flex items-center gap-2 '>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-600'>Weather</h2>
            <MdWbSunny className='text-4xl md:text-6xl text-yellow-500' />
          </div>

          {/* Location and Search Section */}
          <div className="location flex items-center gap-4 flex-wrap md:flex-nowrap mt-2 md:mt-0">
            <div className="loc_logo flex items-center gap-2">
              <FaLocationCrosshairs className='text-xl md:text-2xl text-gray-400' />
              <IoLocationOutline className='text-xl md:text-2xl' />
              <span className='text-gray-500 font-medium text-sm md:text-base'>{city || 'Search for a city...'}</span>
            </div>
            <SearchBox
              value={city}
              onChange={handleChange} // Pass handleChange to SearchBox
              onSubmit={fetchWeatherDetails} // Pass fetchWeatherDetails to SearchBox
              suggestions={suggestions} // Pass suggestions to SearchBox
              showSuggestion={showSuggestion} // Pass showSuggestion to SearchBox
              setShowSuggestion={setShowSuggestion} // Pass setShowSuggestion to SearchBox
            />
          </div>
        </div>
        
        {/* Display weather details if available */}
        {weatherDetails && (
          <div className="weather-details bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{weatherDetails.name}, {weatherDetails.sys.country}</h3>
            <p>Temperature: {(weatherDetails.main.temp - 273.15).toFixed(2)}°C</p>
            <p>Weather: {weatherDetails.weather[0].description}</p>
          </div>
        )}

        {/* Display error message */}
        {error && <p className="text-red-500 text-center">{error}</p>}
      </nav>
    </>
  )
}

export default Navbar;
