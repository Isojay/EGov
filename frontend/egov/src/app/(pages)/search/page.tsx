// pages/search.tsx
"use client"

import { useState } from 'react';
import axiosInstance from '@/app/services/axiosInstance';

const SearchPage = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [searched, setSearched] = useState(false);
  const [searchResults, setSearchResults] = useState<any>(null); // Updated type for single result
  const [selectedOption, setSelectedOption] = useState('birth'); // Default selected option
  const [error, setError] = useState<string>('');

  const handleSearch = async () => {
    const searchRequest = {
      name,
      date: new Date(date),
    };

    try {
      const response = await axiosInstance.post(`/public/${selectedOption}/search`, searchRequest, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setSearchResults(response.data); // Assuming response.data is the single search result object
      setSearched(true);
      setError('');
    } catch (error) {
      console.error('Error fetching search results:', error);
      setError('Error fetching search results. Please try again.');
    }
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  const getStatusText = (status: number | null) => {
    if (status === null) {
      return 'Status not available';
    }
    return status === 1 ? 'Not Verified' : 'Verified';
  };

  const getStatusColor = (status: number | null) => {
    return status === 1 ? 'text-red-500' : 'text-green-500';
  };

  return (
      <div className="max-w-3xl mx-auto mt-8 px-4 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Search</h1>
        <div className="flex space-x-4 mb-4">
          <select
              value={selectedOption}
              onChange={handleOptionChange}
              className="border rounded-md px-3 py-2"
          >
            <option value="birth">Birth</option>
            <option value="death">Death</option>
            {/* Add more options as needed */}
          </select>
          <input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 border rounded-md px-3 py-2"
          />
          <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-40 border rounded-md px-3 py-2"
          />
          <button
              onClick={handleSearch}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Search
          </button>
        </div>

        {searched && !searchResults && (
            <p className="text-red-500">No data found.</p>
        )}

        {searched && searchResults && (
            <div className="border p-4 rounded-md mt-4">
              {selectedOption === 'birth' && (
                  <>
                    <p>Name: {searchResults.name}</p>
                    <p className={getStatusColor(searchResults.status)}>Status: {getStatusText(searchResults.status)}</p>
                  </>
              )}
              {selectedOption === 'death' && (
                  <>
                    <p>Deceased Name: {searchResults.deceasedName}</p>
                    <p className={getStatusColor(searchResults.status)}>Status: {getStatusText(searchResults.status)}</p>
                  </>
              )}
            </div>
        )}

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
  );
};

export default SearchPage;
