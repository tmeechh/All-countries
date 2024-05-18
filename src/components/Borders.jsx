import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBorderCountries } from '../slices/borderSlice';

export default function Borders({ borders }) {
  const dispatch = useDispatch();
  const { borderCountries, isLoading, isError } = useSelector((state) => state.border);

  useEffect(() => {
    if (borders && borders.length > 0) {
      dispatch(fetchBorderCountries(borders));
    } else {
      dispatch({ type: 'border/fetchBorderCountries/fulfilled', payload: ['N/A'] });
    }
  }, [borders, dispatch]);

  return (
    <div>
       {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Something Went Wrong!</div>
      ) : (
        <ul className="flex flex-wrap gap-2 px-2">
          {borderCountries.map((border, index) => (
            <Link to={`/detail/${border}`} key={index}>
              <li className="ul shadow">{border}</li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}
