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

    const orderProduct = async (index: number) => {
        await new Promise((resolve) => setTimeout(resolve, 500));

        dispatch(buyProduct(cart[0].price));
        dispatch(removeFromCart(0));
        setProgress(((index + 1) / cart.length) * 100);
    }

    const orderProducts = async () => {
        if (totalPrice <= userCredit) {
            setIsOrderInProgress(true);

            for (let index = 0; index < cart.length; index++) {
                await orderProduct(index);
            }

            setProgress(0);
            setIsOrderInProgress(false);
            setOrderSuccessOpen(true);
        } else {
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