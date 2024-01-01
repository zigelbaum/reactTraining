import React from 'react';
import Product from '../types/Product'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from '@mui/material';

interface CartItemProps {
    product?: Product;
    open: boolean;
    onOrderClick: (product: Product) => void;
    onCloseClick: () => void;
}

const ProductInfo = (props: CartItemProps) => {

    return (
        <Dialog
            open={props.open}
            onClose={props.onCloseClick}
            dir="rtl"
        >
            <DialogTitle id="info-dialog-title">
                {props.product?.name}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="info-dialog-description">
                    {props.product?.description}
                </DialogContentText>
                <DialogContentText>
                    {`מחיר: ${props.product?.price}`}
                </DialogContentText>
                <img
                    src={props.product?.image}
                    style={{ maxWidth: 300, maxHeight: 400, objectFit: 'contain' }}
                    alt={props.product?.name}
                    title={props.product?.name}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    if (props.product) {
                        props.onOrderClick(props.product);
                    }
                    props.onCloseClick();
                }} >
                    הוסף לעגלה
                </Button>
                <Button onClick={props.onCloseClick} autoFocus>סגור</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProductInfo