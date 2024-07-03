// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: rootReducer,
});

// Define el tipo para useDispatch
export type AppDispatch = typeof store.dispatch;

// Define un hook personalizado para useDispatch con tipado
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
