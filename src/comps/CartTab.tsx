import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, Button, Typography, Box, Snackbar, Alert, LinearProgress } from '@mui/material';

import { removeFromCart, selectCart, selectCartTotalPrice } from '../reducers/cartReducer';
import { buyProduct, selectUserCredit } from '../reducers/userReducer'
import CartItem from './CartItem';
import Product from '../types/Product';
import OrderCompleteDialog from './OrderCompleteDialog';

const CartTab: React.FC = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const totalPrice = useSelector(selectCartTotalPrice);
  const userCredit = useSelector(selectUserCredit);

  const isCartEmpty: boolean = cart.length === 0;

  const [orderSuccessOpen, setOrderSuccessOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isOrderInProgress, setIsOrderInProgress] = useState(false);
  const [orderFailOpen, setOrderFailOpen] = useState(false)

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

  return (
    <div>
      {!isCartEmpty ? (
        <>
          <Snackbar
            open={isOrderInProgress}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert icon={false} variant='filled' severity='info'>
              <LinearProgress variant="determinate" value={progress} sx={{ width: '200px' }} />
            </Alert>
          </Snackbar>
          <Snackbar
            open={orderFailOpen}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert icon={false} variant='filled' severity='error'>
              {`ההזמנה לא הושלמה`}
            </Alert>
          </Snackbar>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              color='primary'
              size='large'
              variant="contained"
              sx={{ textAlign: 'center' }}
              onClick={() => {
                orderProducts();
              }}>
              {`הזמן ${totalPrice.toFixed(2)}₪`}
            </Button>
          </Box>
          <List>
            {cart.map((product: Product, index: number) => (
              <CartItem
                item={product}
                index={index}
                onDeleteClick={() => {
                  dispatch(removeFromCart(index));
                }} />
            ))}
          </List>
        </>) : (
        <Typography sx={{ textAlign: 'center' }}>
          העגלה ריקה
        </Typography>
      )}
      <OrderCompleteDialog open={orderSuccessOpen} onCloseClick={handleClose} />
    </div>
  );
};

export default CartTab;