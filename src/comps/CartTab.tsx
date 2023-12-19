import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, Button, Typography } from '@mui/material';
import { removeFromCart, selectCart, selectCartTotalPrice } from '../reducers/cartReducer';
import { buy, selectUserCredit } from '../reducers/userReducer'
import CartItem from './CartItem';
import Product from '../types/Product';

const CartTab: React.FC = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const totalPrice = useSelector(selectCartTotalPrice);
  const userCredit = useSelector(selectUserCredit);

  const isCartEmpty: boolean = cart.length === 0;

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
            onClick={() => dispatch(buy(totalPrice))}>
            {`הזמן ${totalPrice.toFixed(2)}₪`}
          </Button>
          <List>
            {cart.map((product: Product, index: number) => (
              <CartItem
                item={product}
                index={index}
                onDeleteClick={() => dispatch(removeFromCart(index))} />
            ))}
          </List>
        </>) : (
        <Typography sx={{ textAlign: 'center' }}>
          העגלה ריקה
        </Typography>
      )}
    </div>
  );
};

export default CartTab;