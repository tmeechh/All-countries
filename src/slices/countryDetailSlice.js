// countryDetailSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCountryData = createAsyncThunk(
  'countryDetail/fetchCountryData',
  async (name) => {
    console.log(name);
    const res = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
    const countryData = await res.json();
    console.log(countryData);
    return countryData;
  }
);



const countryDetailSlice = createSlice({
  name: 'countryData',
  initialState: {
    countryData: {},
    isLoading: false,
    isError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountryData.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchCountryData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.countryData = action.payload;
      })
      .addCase(fetchCountryData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      });
  },
});

export default countryDetailSlice.reducer;
