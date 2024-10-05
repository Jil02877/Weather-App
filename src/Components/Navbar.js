'use client';
import React, { useState } from 'react';
import { MdWbSunny } from "react-icons/md";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import SearchBox from './SearchBox';
import axios from 'axios';
import { useAtom } from 'jotai';
import { placeAtom, loadingCityAtom } from '@/app/atom';

// Skeleton Loader Component
const Skeleton = ({ className }) => (
  <div className={`bg-gray-300 rounded-md ${className} animate-pulse`} />
);

// Skeleton for weather details
const WeatherSkeleton = () => (
  <div className="weather-details bg-white p-4 rounded shadow">
    <Skeleton className="h-6 w-48 mb-2" /> {/* City name */}
    <Skeleton className="h-4 w-32 mb-2" /> {/* Temperature */}
    <Skeleton className="h-4 w-40" /> {/* Weather description */}
  </div>
);

const Navbar = () => {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [weatherDetails, setWeatherDetails] = useState(null);
  const [place, setPlace] = useAtom(placeAtom);
  const [isLoading, setLoadingCity] = useAtom(loadingCityAtom); // Track loading state

  // Handle change in the search input
  async function handleChange(value) {
    setCity(value);
    if (value.length >= 3) {
      try {
        const res = await axios.get(`https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`);
        const suggestions = res.data.list.map((item) => item.name);
        setSuggestions(suggestions);
        setError('');
        setShowSuggestion(true);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
        setShowSuggestion(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestion(false);
    }
  }

  // Fetch weather details for the selected city
  async function fetchWeatherDetails(cityName) {
    setLoadingCity(true); // Set loading state to true immediately
    setError('');
    setWeatherDetails(null); // Reset weather details while loading

    try {
      // Simulate loading delay with setTimeout
      setTimeout(async () => {
        const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`);
        setWeatherDetails(res.data);
        setPlace(cityName);
        setCity(cityName); // Update city to the selected city
        setSuggestions([]); // Clear suggestions
        setShowSuggestion(false); // Hide suggestions after fetching weather details
      }, 2000); // Delay for 2 seconds (2000 milliseconds)
    } catch (error) {
      setError('City not found');
      setWeatherDetails(null);
    } finally {
      // Stop loading after the simulated delay
      setTimeout(() => {
        setLoadingCity(false); // Set loading to false after the delay ends
      }, 2000); // Same delay as the setTimeout above
    }
  }

  function handleCurrentLocation() {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(async(postiton)=>{
          const {latitude,longitude} = postiton.coords
          try {
            setLoadingCity(true)
            const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`);
            setTimeout(() => {
              setLoadingCity(false)
              setPlace(res.data.name)
            }, 500);
          } catch (error) {
            setLoadingCity(false)
          }
      })
    }
  }

  return (
    <>
      <nav className="icon shadow-sm sticky top-0 left-0 z-50 bg-white border">
        <div className='h-[10vh] w-full flex flex-wrap justify-between items-center max-w-7xl px-3 mx-auto'>
          {/* Logo Section */}
          <div className='flex items-center gap-2'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-600'>Weather</h2>
            <MdWbSunny className='text-4xl md:text-6xl text-yellow-500' />
          </div>

          {/* Location and Search Section */}
          <div className="location flex items-center gap-4 flex-wrap md:flex-nowrap mt-2 md:mt-0">
            <div className="loc_logo flex items-center gap-2">
              <FaLocationCrosshairs title='Your Current Location' onClick={handleCurrentLocation} className='text-xl md:text-2xl text-gray-400' />
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
              setCity={setCity} // Pass setCity to SearchBox for selected city
            />
          </div>
        </div>

        {/* Display skeleton loader when loading */}
        {isLoading && (
          <div className="flex justify-center items-center min-h-screen p-5 mx-auto">
            <WeatherSkeleton /> {/* Skeleton displayed during loading */}
          </div>
        )}

        {/* Display weather details if available and not loading */}
        {!isLoading && weatherDetails && (
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
  );
};

export default Navbar;
