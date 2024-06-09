import { IErrorInfo, IErrorInitialState, } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IRemoveError {
    index: number;
};

const MAX_ERRORS_COUNT = 3;

const initialState: IErrorInitialState = {
    errors: [],
};

export const errors = createSlice({
    name: 'errors',
    initialState,
    reducers: {
        addError: (state, action: PayloadAction<IErrorInfo>) => {
            const errorsList = [...state.errors];
            if(errorsList.length >= MAX_ERRORS_COUNT) {
                errorsList.shift();
            };
            errorsList.push(action.payload);
            return {
                errors: [
                    ...errorsList,
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