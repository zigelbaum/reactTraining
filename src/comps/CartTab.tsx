import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, Button, Typography, Box } from '@mui/material';
import { removeFromCart, selectCart, selectCartTotalPrice } from '../reducers/cartReducer';
import { buyProduct, selectUserCredit } from '../reducers/userReducer'
import CartItem from './CartItem';
import Product from '../types/Product';
import OrderCompleteDialog from './OrderCompleteDialog';
import OrderProgressBar from './OrderProgressBar';

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
      handleOpen();
    }

  };

  return (
    <div>
      {!isCartEmpty ? (
        <>
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
          {isOrderInProgress && (
            <OrderProgressBar open={isOrderInProgress} progress={progress}/>
          )}
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
      <OrderCompleteDialog open={open} onCloseClick={handleClose} />
    </div>
  );
};

export default CartTab;