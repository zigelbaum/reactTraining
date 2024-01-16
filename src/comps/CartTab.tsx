import { useDispatch, useSelector } from 'react-redux';
import { Button, Typography, Box, LinearProgress } from '@mui/material';

import { removeFromCart, selectCart, selectCartTotalPrice } from '../reducers/cartReducer';
import CartItem from './CartItem';
import Product from '../types/Product';
import OrderCompleteDialog from './OrderCompleteDialog';
import AlertSnackBar from './AlertSnackBar';
import BasicProps from '../basicProps';
import useOrder from '../hooks/useOrder';

const CartTab = (props: BasicProps) => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const totalPrice = useSelector(selectCartTotalPrice);
  const isCartEmpty: boolean = cart.length === 0;

  const {order, handleClose, orderSuccessOpen, progress, isOrderInProgress, orderFailOpen} = useOrder();
  
  return (
    <div>
      {!isCartEmpty ? (
        <>
          <AlertSnackBar
            testid={`order-alertSnackBar_${props.testid}`}
            open={isOrderInProgress}
            alertSeverity={'info'}
            alertContent={<LinearProgress variant="determinate" value={progress} sx={{ width: '200px' }} />} />
          <AlertSnackBar
            testid={`orderFail-alertSnackBar_${props.testid}`}
            open={orderFailOpen}
            alertSeverity={'error'}
            alertContent={`ההזמנה לא הושלמה`} />
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              data-testid={`orderButton_${props.testid}`}
              color='primary'
              size='large'
              variant="contained"
              sx={{ textAlign: 'center' }}
              onClick={() => {
                order();
              }}>
              {`הזמן ${totalPrice.toFixed(2)}₪`}
            </Button>
          </Box>
            {cart.map((product: Product, index: number) => (
              <CartItem
                testid={`cartItem-${index}_${props.testid}`}
                item={product}
                index={index}
                onDeleteClick={() => {
                  dispatch(removeFromCart(index));
                }} />
            ))}
        </>) : (
        <Typography sx={{ textAlign: 'center' }}>
          העגלה ריקה
        </Typography>
      )}
      <OrderCompleteDialog open={orderSuccessOpen} onCloseClick={handleClose} testid={`orederCompleteDialog_${props.testid}`}/>
    </div>
  );
};

export default CartTab;