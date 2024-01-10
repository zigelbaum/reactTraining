import React from 'react';
import { useSelector } from 'react-redux';

import { AppBar, Badge, Toolbar, Typography } from '@mui/material'
import { ShoppingCart } from '@mui/icons-material';

import {selectUserCredit} from '../reducers/userReducer'
import {selectCartTotalCount} from '../reducers/cartReducer'
import BasicProps from '../basicProps';

const CustomAppBar = (props: BasicProps) => {
    const userCredit = useSelector(selectUserCredit);
    const cartTotal = useSelector(selectCartTotalCount);

    return (
    <AppBar position='sticky'>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Badge badgeContent={cartTotal} color="warning">
            <ShoppingCart color="action" />
          </Badge>

          <Typography variant="h6">
            {`סכום כולל: ${userCredit.toFixed(2)}₪`}
          </Typography>
        </Toolbar>
      </AppBar>
  )
}

export default CustomAppBar