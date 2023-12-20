import React from 'react'
import { Snackbar, SnackbarOrigin, Alert, LinearProgress } from '@mui/material';

interface OrderProgressBarProps {
    open: boolean;
    progress: number;
}

const OrderProgressBar = (props: OrderProgressBarProps) => {

    return (
        <Snackbar
        open={props.open}
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
            <Alert icon={false} variant='filled' severity='info'>
                <LinearProgress variant="determinate" value={props.progress} sx={{ width: '200px'}} />
            </Alert>
        </Snackbar>
    )
}

export default OrderProgressBar