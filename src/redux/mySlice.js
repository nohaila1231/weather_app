import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching data
export const fetchData = createAsyncThunk('data/fetchData', async (city) => {
  const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8bdeb8bf75837012069685cc1e5fa15e&units=metric`);
  return response.data;
});

const mySlice = createSlice({
  name: 'myData',
  initialState: {
    data: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        if (action.error.message.includes('404')) {
          state.error = "City not found. Please try again.";
        } else {
          state.error = "Something went wrong. Please try later.";
        }
      });
  },
});

export const myReducer = mySlice.reducer;