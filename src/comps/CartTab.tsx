import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, Button, Typography, LinearProgress, Alert } from '@mui/material';
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

  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isOrderInProgress, setIsOrderInProgress] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const orderProduct = async (index: number) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    dispatch(buyProduct(cart[0].price));
    dispatch(removeFromCart(0));
    setProgress(((index + 1) / 100) * cart.length);
  }

  const orderProducts = async () => {
    if (totalPrice <= userCredit) {
      setIsOrderInProgress(true);

      for (let index = 0; index < cart.length; index++) {
        await orderProduct(index);
        console.log(cart);
      }

      setProgress(0);
      setIsOrderInProgress(false);
      handleOpen();
    }

  };

  return (
    <div>
      {!isCartEmpty ? (
        <>
          <Button
            color='primary'
            size='large'
            variant="contained"
            sx={{ textAlign: 'center' }}
            onClick={() => {
              // dispatch(buy(totalPrice));
              orderProducts();
            }}>
            {`הזמן ${totalPrice.toFixed(2)}₪`}
          </Button>
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
      {isOrderInProgress && (
        <Alert icon={false} severity="info">
          <LinearProgress variant="determinate" value={progress} sx={{ marginTop: 2 }} />
        </Alert>
      )}
      <OrderCompleteDialog open={open} onCloseClick={handleClose} />
    </div>
  );
};

export default CartTab;