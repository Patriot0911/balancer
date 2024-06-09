import { configureStore } from '@reduxjs/toolkit';
import teamsReducer from './features/teams-slice';
import errorsReducer from './features/errors-slice';
import allPlayersReducer from './features/all-players-slice';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const store = configureStore({
    reducer: {
        allPlayersReducer,
        errorsReducer,
        teamsReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
