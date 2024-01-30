import Product from '../types/Product';

import { ListItem, ListItemText, Avatar, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BasicProps from '../basicProps';
import CartReduxItem from '../types/CartReduxItem'

interface CartItemProps extends BasicProps {
    item: CartReduxItem;
    index: number;
    onDeleteClick: () => void;
}

const CartItem = (props: CartItemProps) => {
    return (
        <ListItem key={props.index} data-testid={props.testid}>
            <Button onClick={props.onDeleteClick}>
                <DeleteIcon color='error' />
            </Button>
            <ListItemText
                sx={{ textAlign: 'right', marginRight: '20px' }}
                primary={props.item.quantity}
            />
            <ListItemText
                sx={{ textAlign: 'right', marginRight: '20px' }}
                primary={props.item.product.name}
                secondary={`${props.item.product.price}₪`}                
            />
            <Avatar alt={props.item.product.name} src={props.item.product.image} sx={{ width: 50, height: 50 }} />
        </ListItem>
    );
}

export default CartItem;