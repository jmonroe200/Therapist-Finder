
import React from 'react';
import { SearchIcon } from './icons/SearchIcon';

interface SearchBarProps {
  zipcode: string;
  setZipcode: (zipcode: string) => void;
  onSearch: () => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ zipcode, setZipcode, onSearch, isLoading }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
    if (value.length <= 5) {
      setZipcode(value);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      onSearch();
    }
  };

  return (
    <div className="flex items-center gap-2 sm:gap-4 p-2 border border-slate-200 rounded-full focus-within:ring-2 focus-within:ring-teal-500 focus-within:border-teal-500 transition-all duration-300 bg-slate-50">
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={zipcode}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Enter 5-digit zipcode"
        className="flex-grow bg-transparent text-slate-700 placeholder-slate-400 focus:outline-none px-4 py-2"
        disabled={isLoading}
      />
      <button
        onClick={onSearch}
        disabled={isLoading || zipcode.length !== 5}
        className="flex items-center justify-center bg-teal-500 text-white rounded-full h-12 w-12 sm:h-12 sm:w-auto sm:px-6 transition-all duration-300 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-slate-300 disabled:cursor-not-allowed shrink-0"
      >
        <SearchIcon className="h-6 w-6 sm:hidden" />
        <span className="hidden sm:inline font-semibold">{isLoading ? 'Searching...' : 'Search'}</span>
      </button>
    </div>
  );
};

export default SearchBar;
