import { IInitialState, IPlayer } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IInitialState = {
    value: []
};

interface IRemovePlayer {
    name: string;
};

interface IPlayerUpdate {
    name: string;
    player: IPlayer;
};

export const allPlayers = createSlice({
    name: 'allPlayers',
    initialState,
    reducers: {
        clearAllPlayers: () => initialState,
        addPlayer: (state, action: PayloadAction<IPlayer>) => {
            return {
                value: [
                    ...state.value,
                    action.payload,
                ],
            };
        },
        replacePlayer: (state, action: PayloadAction<IPlayerUpdate>) => {
            const valueWithoutTarget = state.value.filter(
                (player) => player.name !== action.payload.name
            );
            return {
                value: [
                    ...valueWithoutTarget,
                    action.payload.player,
                ],
            };
        },
        removePlayer: (state, action: PayloadAction<IRemovePlayer>) => {
            const players = state.value.filter(
                player => player.name !== action.payload.name
            );
            return {
                value: [
                    ...players,
                ],
            };
        },
    },
});

export const {
    clearAllPlayers,
    addPlayer,
    removePlayer,
    replacePlayer,
} = allPlayers.actions;

export default allPlayers.reducer;