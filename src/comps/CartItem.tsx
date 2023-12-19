import React from 'react';
import Product from '../types/Product';

import { ListItem, ListItemText, Avatar, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface CartItemProps {
    item: Product;
    index: number;
    onDeleteClick: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, index, onDeleteClick }) => {
    return (
        <>
        <ListItem key={index}>
            <Button onClick={onDeleteClick}>
                <DeleteIcon color='error' />
            </Button>
            <ListItemText
                sx={{ textAlign: 'right', marginRight: '20px' }}
                primary={item.name}
                secondary={`${item.price}₪`}
            />
            <Avatar alt={item.name} src={item.image} sx={{ width: 50, height: 50 }} />
        </ListItem>
      </>
    );
}

export default CartItem;