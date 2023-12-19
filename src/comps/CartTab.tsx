import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, Button, Typography } from '@mui/material';
import { removeFromCart, selectCart, selectCartTotalPrice } from '../reducers/cartReducer';
import { buy, selectUserCredit } from '../reducers/userReducer'
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

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }
  // const orderProducts = () => {
  //   if (totalPrice > userCredit){

  //   } else {

  //   }
  // }

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
              dispatch(buy(totalPrice));
              handleClose();
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
      <OrderCompleteDialog open={open} onCloseClick={handleClose} />
    </div>
  );
};

export default CartTab;