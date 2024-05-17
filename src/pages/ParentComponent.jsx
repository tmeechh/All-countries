import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountryData } from '../slices/countryDetailSlice';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import Borders from '../components/Borders';

export default function ParentComponent() {
  const { name } = useParams();
  console.log(name);
  const dispatch = useDispatch();
  const { countryData, isLoading, isError } = useSelector(
    (state) => state.countryData
  );

  useEffect(() => {
    dispatch(fetchCountryData(name));
  }, [dispatch, name]);


  if (isLoading) return <div className="spinner "></div>;

  if (isError) return <div>Error: {isError}</div>;

  if (!Array.isArray(countryData)) return;

  const {
    flags,
    name: countryName,
    population,
    region,
    subregion,
    capital,
    tld,
    currencies,
    languages,
    status,
    startOfWeek,
    borders,
  } = countryData[0];
  //   console.log(countryData[0]);

  const getNativeName = (name) => {
    const nativeName = Object.values(name?.nativeName)[0].common;
    return nativeName || 'N/A';
  };

  //Optional Chainning

  const getCurrency = (currencies) => {
    return currencies ? Object.values(currencies)[0].name : 'N/A';
  };

  const getLanguage = (languages) => {
    return languages && Object.keys(languages).length > 0 ? (
      <span>
        {' '}
        {Object.values(languages).map((lan, index, array) => (
          <span key={lan}>
            {lan}
            {index === array.length - 2
              ? ' and '
              : index !== array.length - 1
              ? ', '
              : ''}
          </span>
        ))}
      </span>
    ) : (
      'N/A'
    );
  };

  // const getBorderCountries = async (borderCountries) => {
  //   console.log(borderCountries);
  //   if (!Array.isArray(borderCountries) || borderCountries.length === 0) {
  //     return 'N/A';
  //   }

  //   // console.log(borderCountries[0]);
  //   // const code = borderCountries ? borderCountries[0] : '';
  //   //   const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
  //   //   console.log(res);

  //   return (
  //     <span className="flex flex-wrap ml-2">
  //       jkh
  //       {/* {borderCountries.map((country) => (
  //         <ul key={country} className="ul shadow">
  //           <Link to={`/detail/${country}`} className="">
  //             <li>{country || 'N/A'}</li>
  //           </Link>
  //         </ul>
  //       ))} */}
  //     </span>
  //   );
  // };

  return (
    <div>
      <div className=" done  overflow-hidden sm:px-5  px-14 background  min-h-screen">
        <div className="mt-8  ">
          <Link
            to="/"
            className="border-slate-100 bg-white shadow px-6 py-2 hover:bg-gray-100 flex justify-between w-28 back"
          >
            {' '}
            <ArrowLeftIcon className="w-5 h-4" />
            Back
          </Link>
        </div>

        <div className="detail-container  py-14 flex overflow-hidden lg:grid md:grid-cols-1 lg:grid-cols-1   gap-x-24 ">
          <div className="">
            <img
              src={flags?.svg}
              alt={flags?.alt}
              className="detail-image  lg:h-64 h-72 object-cover w-[35rem] sm:w-auto sm:h-[13rem]"
            />
          </div>
          <div className="detail-details  -ml-10 lg:ml-0">
            <h1 className="py-5 font-extrabold text-2xl  overflow-hidden w-96">
              {countryName?.common}
            </h1>
            <p className="w-full  md:w-60 ">
              <span className="font-bold">Native Name: </span>
              {getNativeName(countryName)}
            </p>

            <p className="py-4 w-full md:w-60 ">
              <span className="font-bold">Population: </span>
              {population?.toLocaleString()}
            </p>

            <p className="pb-3">
              <span className="font-bold">Region: </span>
              {region}
            </p>
            <p className="pb-3">
              <span className="font-bold">Sub Region: </span>
              {subregion || 'N/A'}
            </p>

            <p className="pb-12 w-64">
              <span className="font-bold">Capital: </span>
              {capital || 'N/A'}
            </p>
          </div>
          <div className="mt-8 lg:mt-1  other-detail -ml-10">
            <p className="pb-3 w-full md:w-60 ">
              <span className="font-bold">Top Level Domain: </span>
              {tld}
            </p>
            <p className="pb-3 ">
              <span className="font-bold">Currencies: </span>
              {getCurrency(currencies)}
            </p>
            <p className="pb-3 flex flex-wrap w-64 ">
              <span className="font-bold">Languages: </span>{' '}
              {getLanguage(languages)}
            </p>
            <p className="pb-3">
              <span className="font-bold">Status: </span>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </p>
            <p className="">
              <span className="font-bold">Start Of Week: </span>
              {startOfWeek.charAt(0).toUpperCase() + startOfWeek.slice(1)}
            </p>
          </div>
        </div>
        <div className="border-countries ml-[36%] -mt-[8%] absolute lg:ml-0 lg:mt-0">
          <p className="flex flex-wrap">
            <span className="font-bold ">Border Countries: </span>
            <Borders borders={borders} />
          </p>
        </div>
      </div>
    </div>
  );
}
