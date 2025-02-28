import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favoriteCities';

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
});

export default store;