import { IInitialState, IPlayer } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IInitialState = {
    value: []
};

export const allPlayers = createSlice({
    name: 'allPlayers',
    initialState,
    reducers: {
        clearAllPlayers: () => initialState,
        addPlayer: (state, action: PayloadAction<IPlayer>) => {
            console.log(state);
            return {
                value: [
                    ...state.value,
                    action.payload
                ]
            }
        }
    }
});

export const {
    clearAllPlayers,
    addPlayer
} = allPlayers.actions;

export default allPlayers.reducer;