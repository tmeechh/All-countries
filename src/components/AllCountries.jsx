/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountries } from '../slices/countriesSlice';
import { Link } from 'react-router-dom';

export default function AllCountries({ searchTerm, selectedRegion }) {
  const dispatch = useDispatch();
  const {
    countries: allCountries,
    isLoading,
    isError,
  } = useSelector((state) => state.countries);
  const [displayedCountries, setDisplayedCountries] = useState([]);

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  useEffect(() => {
    // Filter countries based on search term and selected region
    const filteredCountries = allCountries.filter((country) => {
      const matchesSearchTerm =
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (country.capital &&
          typeof country.capital === 'string' &&
          country.capital.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesRegion =
        selectedRegion === '' || country.region === selectedRegion;

      return matchesSearchTerm && matchesRegion;
    });

    setDisplayedCountries(filteredCountries); // Limit to the first 8 filtered countries .slice(0, 8)
  }, [searchTerm, selectedRegion, allCountries]);

  if (isLoading) {
    return <p className="spinner"></p>;
  }

  if (isError) {
    return <p className="py-6">{isError}</p>;
  }

  console.log(
    allCountries?.forEach((d) => {
      console.log(d.border);
    })
  );
  return (
    <div className="mid-screen  py-10 grid justify-items-center gap-y-10 pb-2 overflow-hidden grid-cols-4 sm:grid-cols-1 xsm:grid-cols-1 sm:justify-items-center xsm:justify-items-center md:grid-cols-2 md:gap-y-10 md:justify-items-center lg:grid-cols-3 lg:gap-10 md:gap-2">
      {displayedCountries.map((country, i) => (
        <div
          key={i}
          className="h-full flex flex-col  items-center justify-center bg-white w-64 md:w-[20rem] shadow rounded overflow-hidden"
        >
          
          <div className='image-container h-44 w-full overflow-hidden'>
            <img
              src={country?.flags?.svg}
              alt={country?.flags?.alt}
              className="h-full w-96 object-cover rounded-t"
            />
            </div>
            <div className="short-details ">
              <div className="flex flex-col flex-grow px-5 py-5 w-64 lg:w-56 md:w-80 ">
                <h1 className="py-5 font-extrabold text-lg w-full  overflow-hidden text-ellipsis whitespace-nowrap">
                  {country?.name?.common}
                </h1>
                <p className="py-1 w-full md:w-60 ">
                  <span className="font-bold">Population: </span>
                  {country?.population.toLocaleString()}
                </p>
                <p className="py-1">
                  <span className="font-bold">Region: </span>
                  {country?.region}
                </p>
                <p className="py-1 w-full  overflow-hidden text-ellipsis  md:w-96">
                  <span className="text-balance font-bold  ">Capital: </span>
                  {country?.capital || 'N/A'}
              </p>
              
                <p className="pt-4">
                  <Link
                    to={`/detail/${country?.name?.common}`}
                    className=" back border px-3 py-1 rounded hover:bg-gray-100"
                  >
                    More Details...
                  </Link>
                </p>
              </div>
            </div>
           
        </div>
      ))}
    </div>
  );
}
