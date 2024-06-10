import { IErrorInfo, IErrorInitialState, } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IRemoveError {
    index: number;
};

const initialState: IErrorInitialState = {
    errors: [],
};

export const errors = createSlice({
    name: 'errors',
    initialState,
    reducers: {
        addError: (state, action: PayloadAction<IErrorInfo>) => {
            const indexOfError = state.errors.findIndex(
                (item) => item.title === action.payload.title && item.description === action.payload.description
            );
            if(indexOfError === -1) {
                return ({
                    errors: [
                        ...state.errors,
                        {
                            ...action.payload,
                            count: 0,
                        },
                    ],
                });
            };
            return {
                errors: [
                    ...state.errors.map(
                        (item, index) => ({
                            ...item,
                            count: index === indexOfError ? item.count + 1 : item.count,
                        })
                    ),
                ],
            };
        },
        removeError: (state, action: PayloadAction<IRemoveError>) => {
            return {
                errors: [
                    ...state.errors.filter(
                        (_, index) => index !== action.payload.index
                    ),
                ],
            };
        },
    },
});

export const {
    addError,
    removeError
} = errors.actions;

export default errors.reducer;