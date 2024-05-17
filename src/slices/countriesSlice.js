import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCountries = createAsyncThunk(
  'countries/fetchCountries',
  async () => {
    const res = await fetch('https://restcountries.com/v3.1/all');
    const countries = await res.json();
    return countries;
  }
);

const countriesSlice = createSlice({
  name: 'countries',
  initialState: {
    countries: [],
    isLoading: false,
    isError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.countries = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      });
  },
});

export default countriesSlice.reducer;
