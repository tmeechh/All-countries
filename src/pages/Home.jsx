import React, { useState } from 'react';
import AllCountries from '../components/AllCountries';
import { MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/solid';

export const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleRegionChange = event => {
    setSelectedRegion(event.target.value);
  };

  return (
    <>
      <div className="py-11 px-5 overflow-hidden background relative shadow">
        <div className="absolute top-16 left-20 sm:left-10">
          <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
        </div>
        <div className="px-5 flex justify-between md:grid gap-5 sm:px-0.5">
          <input
            type="text"
            placeholder="Search for a country..."
            className="mt-1 mb-3 h-12 px-20 shadow w-5/12 md:w-96 input-field sm:w-80 sm:px-10 rounded"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className="dropdown-container ">
            <select
              value={selectedRegion}
              onChange={handleRegionChange}
              className="custom-select input-field shadow"
              id='select'
            >
              <option  value="" >All Region</option>
              <option  value="Africa">Africa</option>
              <option   value="Americas">Americas</option>
              <option   value="Asia">Asia</option>
              <option   value="Europe">Europe</option>
              <option  value="Oceania">Oceania</option>
            </select>
            
          </div>
        </div>
        <AllCountries searchTerm={searchTerm} selectedRegion={selectedRegion} />
      </div>
    </>
  );
};

