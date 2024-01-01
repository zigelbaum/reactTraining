import React from 'react'
import {
    Dialog,
    DialogTitle,
    DialogActions,
    Button,
} from '@mui/material';

interface OrderCompleteProps {
    open: boolean;
    onCloseClick: () => void;
}

const OrderCompleteDialog = (props: OrderCompleteProps) => {
    return (
        <Dialog
            open={props.open}
            onClose={props.onCloseClick}
            dir="rtl"
        >
            <DialogTitle id="order-complete-dialog-title">
                {`תתחדש\י!`}
            </DialogTitle>
            <DialogActions>
                <Button onClick={props.onCloseClick} autoFocus>סגור</Button>
            </DialogActions>
        </Dialog>
    )
}

export default OrderCompleteDialog