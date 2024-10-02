import React from 'react';

const SearchBox = ({ value, onChange, onSubmit, suggestions, showSuggestion, setShowSuggestion }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value) {
      onSubmit(value); // Call onSubmit with the current city value
    }
  };

  const handleSuggestionClick = (suggestion) => {
    onChange(suggestion); // Set the value in the parent component
    onSubmit(suggestion); // Fetch weather details for the selected suggestion
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setShowSuggestion(suggestions.length > 0)}
          className="border rounded p-2"
          placeholder="Search for a city..."
        />
      </form>
      {showSuggestion && suggestions.length > 0 && (
        <ul className="absolute bg-white border border-gray-300 rounded w-full">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="cursor-pointer p-2 hover:bg-gray-200"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
