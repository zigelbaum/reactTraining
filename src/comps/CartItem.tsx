import React from 'react';
import Product from '../types/Product';

import { ListItem, ListItemText, Avatar, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface CartItemProps {
    item: Product;
    index: number;
    onDeleteClick: () => void;
}

const CartItem = (props: CartItemProps) => {
    return (
        <ListItem key={props.index}>
            <Button onClick={props.onDeleteClick}>
                <DeleteIcon color='error' />
            </Button>
            <ListItemText
                sx={{ textAlign: 'right', marginRight: '20px' }}
                primary={props.item.name}
                secondary={`${props.item.price}₪`}
            />
            <Avatar alt={props.item.name} src={props.item.image} sx={{ width: 50, height: 50 }} />
        </ListItem>
    );
}

export default CartItem;