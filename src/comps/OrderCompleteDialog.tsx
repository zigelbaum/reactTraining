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

const OrderCompleteDialog: React.FC<OrderCompleteProps> = ({open, onCloseClick}) => {
    return (
        <Dialog
            open={open}
            onClose={onCloseClick}
            dir="rtl"
        >
            <DialogTitle id="order-complete-dialog-title">
                {`תתחדש\י!`}
            </DialogTitle>
            <DialogActions>
                <Button onClick={onCloseClick} autoFocus>סגור</Button>
            </DialogActions>
        </Dialog>
    )
}

export default OrderCompleteDialog