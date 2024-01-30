import { useDispatch, useSelector } from 'react-redux';
// import { useEffect } from 'react';
import { addToCart, removeFromCart, selectCart, selectCartTotalPrice } from '../reducers/cartReducer';
import Product from '../types/Product';
import CartReduxItem from '../types/CartReduxItem';

interface UseCart {
    cart: CartReduxItem[];
    totalPrice: number;
    addToCart: (product: Product, openAddFail: (open: boolean) => void) => void;
    removeFromCart: (index: number) => void;
}

const useCart = (): UseCart => {
    const dispatch = useDispatch();
    const cart = useSelector(selectCart);
    const totalPrice = useSelector(selectCartTotalPrice);

    const getQuantityInCart = (code: number): number => {

        const itemInCart = cart.find((item) => item.product.code === code);
        return itemInCart ? itemInCart.quantity : 0;
    };

    const addToCartHandler = (product: Product, openAddFail: (open: boolean) => void) => {

        const availableQuantity = product.amount - getQuantityInCart(product.code);

        if (availableQuantity > 0)
        {
            dispatch(addToCart(product));
        } else {
            openAddFail(true);
        }
    };

    const removeFromCartHandler = (index: number) => {
        dispatch(removeFromCart(index));
    };

    return {
        cart,
        totalPrice,
        addToCart: addToCartHandler,
        removeFromCart: removeFromCartHandler,
    };
};

export default useCart;