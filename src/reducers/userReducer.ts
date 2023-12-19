import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './rootReducer';

interface UserState {
    credit: number;
}

const initialState: UserState = {
    credit: 1000,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        buy: (state, action: PayloadAction<number>) => {
            state.credit -= action.payload;
        }
    },
});

export const { buy } = userSlice.actions;
export const selectUserCredit = (state: RootState) => state.user.credit;

export default userSlice.reducer;