import React from 'react';
import Product from '../types/Product'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

interface CartItemProps {
    product?: Product;
    open: boolean;
    onOrderClick: (product: Product) => void;
    onCloseClick: () => void;
}

const ProductInfo: React.FC<CartItemProps> = ({ product, open,onCloseClick,onOrderClick }) => {

    return (
        <Dialog
            open={open}
            onClose={onCloseClick}
            dir="rtl"
        >
            <DialogTitle id="alert-dialog-title">
                {product?.name}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {`${product?.description}\n ${product?.price}₪`}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCloseClick}>הוסף לעגלה</Button>
                <Button onClick={onCloseClick} autoFocus>
                    סגור
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProductInfo