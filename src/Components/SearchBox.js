'use client'
import React from 'react'
import { FaSearch } from "react-icons/fa";
import { useState } from 'react';

const SearchBox = ({ value, onChange, onSubmit, suggestions, showSuggestion, setShowSuggestion }) => {
  const handleChange = (e) => {
    onChange(e.target.value); // Call the parent's handleChange
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(value); // Call the parent's fetchWeatherDetails function
    setShowSuggestion(false); // Hide suggestions after submission
    onChange(''); // Clear the input field after submission
  }

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="searchbox flex items-center">
        <input 
          type="text" 
          value={value} 
          onChange={handleChange} 
          placeholder='Search Location...' 
          className='border ml-2 rounded-l-md focus:outline-none focus:border-yellow-500 h-full py-2' 
        />
        <button 
          type='submit' 
          className='bg-yellow-500 w-full py-[10px] px-1 rounded-r-md hover:bg-yellow-400'>
          <FaSearch className='text-xl' />
        </button>
      </form>

      {/* Suggestion Box */}
      {showSuggestion && suggestions.length > 0 && (
        <div className="absolute z-10 bg-white border border-gray-300 rounded shadow-md mt-1 w-full">
          {suggestions.map((suggestion, index) => (
            <div 
              key={index} 
              className="p-2 hover:bg-yellow-200 cursor-pointer"
              onClick={() => {
                onChange(suggestion); // Set the clicked suggestion in the input
                onSubmit(suggestion); // Fetch weather details for the clicked suggestion
                setShowSuggestion(false); // Hide suggestions
                onChange(''); // Clear the input field after selecting a suggestion
              }}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBox;
