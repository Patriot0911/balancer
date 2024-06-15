import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IRoleBalanceInfo {
    tank: number;
    damage: number;
    support: number;
};

type TFitBalanceInfo = boolean | number;

type TBalanceTypeInfo = 'Classic' | 'Mixed';

interface IBalanceOptions {
    teamsCount: TFitBalanceInfo;
    balanceType: TBalanceTypeInfo;
    roles: IRoleBalanceInfo;
};

const initialState: IBalanceOptions = {
    teamsCount: 2,
    roles: {
        tank: 1,
        damage: 2,
        support: 2,
    },
    balanceType: 'Mixed',
};

export const balanceOptions = createSlice({
    name: 'balanceOptions',
    initialState,
    reducers: {
        changeBalanceTeamSettings: (state, action: PayloadAction<TFitBalanceInfo>) => {
            return {
                ...state,
                teamsCount: action.payload,
            };
        },
        changeBalanceType: (state, action: PayloadAction<TBalanceTypeInfo>) => {
            return {
                ...state,
                balanceType: action.payload,
            };
        },
        changeRolesSettings: (state, action: PayloadAction<Partial<IRoleBalanceInfo>>) => {
            return {
                ...state,
                roles: {
                    ...state.roles,
                    ...action.payload,
                },
            };
        },
    },
});

export const {
    changeBalanceType,
    changeRolesSettings,

} = balanceOptions.actions;

export default balanceOptions.reducer;
