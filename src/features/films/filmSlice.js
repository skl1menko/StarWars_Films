// src/features/films/filmSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchFilmById = createAsyncThunk('film/fetchFilmById', async (id) => {
  const res = await fetch(`https://swapi.tech/api/films/${id}`);
  const data = await res.json();
  return data.result.properties;
});

const filmSlice = createSlice({
  name: 'film',
  initialState: {
    details: null,
    status: 'idle',
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilmById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFilmById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.details = action.payload;
      })
      .addCase(fetchFilmById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default filmSlice.reducer;
