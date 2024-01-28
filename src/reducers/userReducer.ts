import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './rootReducer';

interface UserState {
    credit: number;
    isLoggedIn: boolean;
}

const initialState: UserState = {
    credit: 1000,
    isLoggedIn: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        buyProduct: (state, action: PayloadAction<number>) => {
            state.credit -= action.payload;
        },
        login: (state) => {
            state.isLoggedIn = true;
        }
    },
});

export const { buyProduct, login } = userSlice.actions;
export const selectUserCredit = (state: RootState) => state.user.credit;
export const selectIsUserLoggedIn = (state: RootState) => state.user.isLoggedIn;

export default userSlice.reducer;