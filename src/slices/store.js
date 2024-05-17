import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // Assuming you have a rootReducer with combineReducers
import countryDetailReducer from './countryDetailSlice';
import countriesReducer from './countriesSlice';
import borderReducer from '../slices/borderSlice';

const store = configureStore({
  reducer: {
    // Combine your reducers here
    rootReducer: rootReducer,
    countries: countriesReducer,
    countryData: countryDetailReducer,
    border: borderReducer,
    // country: countryDetailSlice.reducer, // Access the reducer property of the slice
  },
});

export default store;
