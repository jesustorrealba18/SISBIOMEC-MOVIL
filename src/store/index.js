import { configureStore } from '@reduxjs/toolkit';
import atletasReducer from './slices/atletasSlice';
import observacionesReducer from './slices/observacionesSlice';

export const store = configureStore({
  reducer: {
    atletas: atletasReducer,
    observaciones: observacionesReducer,
  },
});
