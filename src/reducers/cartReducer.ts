import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Product from '../types/Product';
import { RootState } from './rootReducer';

interface CartState {
    products: Product[];
    totalPrice: number;
}

const initialState: CartState = {
    products: [],
    totalPrice: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            state.products.push(action.payload);
            state.totalPrice += action.payload.price;
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            console.log(state.products.length);
            state.totalPrice -= state.products[action.payload].price;
            state.products.splice(action.payload, 1);
        },
    },
    extraReducers: (builder) => {
        builder.addCase('user/buy', (state, action) => {

            return initialState;
        });
    },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export const selectCart = (state: RootState) => state.cart.products;
export const selectCartTotalPrice = (state: RootState) => state.cart.totalPrice;
export const selectCartTotalCount = (state: RootState) =>
    state.cart.products.length;
export default cartSlice.reducer;