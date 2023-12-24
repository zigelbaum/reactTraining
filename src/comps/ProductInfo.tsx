import React from 'react';
import Product from '../types/Product'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    CardMedia
} from '@mui/material';

interface CartItemProps {
    product?: Product;
    open: boolean;
    onOrderClick: (product: Product) => void;
    onCloseClick: () => void;
}

const ProductInfo: React.FC<CartItemProps> = ({ product, open, onCloseClick, onOrderClick }) => {

    return (
        <Dialog
            open={open}
            onClose={onCloseClick}
            dir="rtl"
        >
            <DialogTitle id="info-dialog-title">
                {product?.name}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="info-dialog-description">
                    {product?.description}
                </DialogContentText>
                <DialogContentText>
                    {`מחיר: ${product?.price}`}
                </DialogContentText>
                <CardMedia
                    component="img"
                    image={product?.image}
                    sx={{ maxWidth: 300, maxHeight: 400, objectFit: 'contain' }}
                    alt={product?.name}
                    title={product?.name}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    if (product) {
                        onOrderClick(product);
                    }
                    onCloseClick();
                }} >
                    הוסף לעגלה
                </Button>
                <Button onClick={onCloseClick} autoFocus>סגור</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProductInfo