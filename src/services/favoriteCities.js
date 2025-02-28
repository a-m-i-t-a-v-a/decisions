import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: { cities: [] },
  reducers: {
    addFavorite: (state, action) => {
      if (!state.cities.includes(action.payload)) {
        state.cities.push(action.payload);
      }
    },
    removeFavorite: (state, action) => {
      state.cities = state.cities.filter((city) => city !== action.payload);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
