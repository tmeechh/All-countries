// reducers.js
import { combineReducers } from 'redux';
import countriesReducer from './countriesSlice';
import countryDetailReducer from './countryDetailSlice';

const rootReducer = combineReducers({
  countries: countriesReducer,
  countryData: countryDetailReducer,
});

export default rootReducer;
