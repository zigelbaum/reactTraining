import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import { removeFromCart, selectCart, selectCartTotalPrice } from '../reducers/cartReducer';
import { buyProduct, selectUserCredit } from '../reducers/userReducer'

interface OrderActions {
    order: () => void;
    handleClose: () => void;
    orderSuccessOpen: boolean;
    progress: number;
    isOrderInProgress: boolean;
    orderFailOpen: boolean;
}

const useOrder = (): OrderActions => {

    const cart = useSelector(selectCart);
    const dispatch = useDispatch();
    const totalPrice = useSelector(selectCartTotalPrice);
    const userCredit = useSelector(selectUserCredit);

    const [orderSuccessOpen, setOrderSuccessOpen] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [isOrderInProgress, setIsOrderInProgress] = useState<boolean>(false);
    const [orderFailOpen, setOrderFailOpen] = useState<boolean>(false)

    useEffect(() => {
        setOrderSuccessOpen(false);
        setProgress(0);
        setIsOrderInProgress(false);
        setOrderFailOpen(false);
    }, []);

    const handleClose = () => {
        setOrderSuccessOpen(false);
    }

    const updateProductQuantity = async (id: string, newQuantity: number) => {

        const response = await fetch(`https://localhost:5001/products/${id}/update-quantity?newQuantity=${newQuantity}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok)
        {
            console.error('Failed to update product quantity');
            throw new Error(`Failed to update product ${id} quantity`);
        }
    };

    const orderProduct = async (index: number) => {
        const productInCart = cart[index];
        const totalPriceForProduct = productInCart.product.price * productInCart.quantity;

        try
        {
            await updateProductQuantity(productInCart.product.id, productInCart.product.amount - productInCart.quantity);

            dispatch(buyProduct(totalPriceForProduct));

            dispatch(removeFromCart(0));
            setProgress(((index + 1) / cart.length) * 100);
        } catch (error)
        {
            throw error;
        }
    }

    const orderProducts = async () => {
        if (totalPrice <= userCredit)
        {
            setIsOrderInProgress(true);

            try
            {
                for (let index = 0; index < cart.length; index++)
                {
                    await orderProduct(index);
                }

                setProgress(0);
                setIsOrderInProgress(false);
                setOrderSuccessOpen(true);
            } catch (error) {
                setIsOrderInProgress(false);
                setOrderFailOpen(true);
            }
        } else
        {
            setOrderFailOpen(true);
        }
    };

    return {
        order: orderProducts,
        handleClose: handleClose,
        orderSuccessOpen,
        progress,
        isOrderInProgress,
        orderFailOpen,
    };
}

export default useOrder;