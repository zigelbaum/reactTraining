import React, { ReactNode } from 'react'
import { Snackbar, Alert, AlertColor } from '@mui/material';

interface AlertSnackBarProps {
    open: boolean;
    alertSeverity: AlertColor | undefined;
    alertContent: ReactNode;
}

const AlertSnackBar = (props: AlertSnackBarProps) => {
    return (
        <Snackbar
            open={props.open}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert icon={false} variant='filled' severity={props.alertSeverity}>
            {props.alertContent}
            </Alert>
        </Snackbar>
    )
}

export default AlertSnackBar