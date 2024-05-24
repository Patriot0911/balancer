import { ITeamInfo, ITeamInitialState } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: ITeamInitialState = {
    value: []
};

export const teams = createSlice({
    name: 'teams',
    initialState,
    reducers: {
        clearAllTeams: () => initialState,
        addTeam: (state, action: PayloadAction<ITeamInfo>) => {
            return {
                value: [
                    ...state.value,
                    action.payload
                ]
            };
        }
    }
});

export const {
    clearAllTeams,
    addTeam
} = teams.actions;

export default teams.reducer;