import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Product from '../types/Product';
import { RootState } from './rootReducer';
import CartReduxItem from '../types/CartReduxItem';

interface CartState {
    items: CartReduxItem[];
    totalPrice: number;
}

const initialState: CartState = {
    items: [],
    totalPrice: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const existingItemIndex = state.items.findIndex(item => item.product.code === action.payload.code);

            if (existingItemIndex !== -1)
            {
                state.items[existingItemIndex].quantity += 1;
            } else
            {
                state.items.push({ product: action.payload, quantity: 1 });
            }

            state.totalPrice += action.payload.price;
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            const itemToRemove = state.items[action.payload];

            if (itemToRemove)
            {
                // if (itemToRemove.quantity === 1)
                // {
                //     state.items = state.items.filter((_, index) => index !== action.payload);
                // } else
                // {
                //     itemToRemove.quantity -= 1;
                // }

                // state.totalPrice -= itemToRemove.product.price;

                state.items = state.items.filter((_, index) => index !== action.payload);
                state.totalPrice -= (itemToRemove.product.price * itemToRemove.quantity);
            }
        },
    },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export const selectCart = (state: RootState) => state.cart.items;
export const selectCartTotalPrice = (state: RootState) => state.cart.totalPrice;
export const selectCartTotalCount = (state: RootState) =>
    state.cart.items.reduce((totalCount, item) => totalCount + item.quantity, 0);
export default cartSlice.reducer;