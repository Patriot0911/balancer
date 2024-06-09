import { IPlayersInitialState, IPlayer } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IPlayersInitialState = {
    players: [],
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
                players: [
                    ...state.players,
                    action.payload,
                ],
            };
        },
        replacePlayer: (state, action: PayloadAction<IPlayerUpdate>) => {
            const valueWithoutTarget = state.players.filter(
                (player) => player.name !== action.payload.name
            );
            return {
                players: [
                    ...valueWithoutTarget,
                    action.payload.player,
                ],
            };
        },
        removePlayer: (state, action: PayloadAction<IRemovePlayer>) => {
            const players = state.players.filter(
                player => player.name !== action.payload.name
            );
            return {
                players: [
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