import { configureStore } from '@reduxjs/toolkit';
import allPlayersReducer from './features/all-players-slice';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const store = configureStore({
    reducer: {
        allPlayersReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
