import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { Home, ShoppingCart } from '@mui/icons-material';
import { TabPanel, TabContext } from '@mui/lab';
import { AppBar, Badge, Toolbar, Typography, Box, Tabs, Tab } from '@mui/material';

import './App.css';
import data from './data/products.json';
import ProductsListTab from './comps/ProductsListTab';
import CartTab from './comps/CartTab';
import {selectUserCredit} from './reducers/userReducer'
import {selectCartTotalCount} from './reducers/cartReducer'

function App() {
  const userCredit = useSelector(selectUserCredit);
  const cartTotal = useSelector(selectCartTotalCount);

  const [tab, setTab] = useState<number>(1);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <div className="App">
      <AppBar position='sticky'>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Badge badgeContent={cartTotal} color="warning">
            <ShoppingCart color="action" />
          </Badge>

          <Typography variant="h6">
            סכום כולל: {userCredit}₪
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Tabs value={tab} onChange={handleTabChange} >
          <Tab icon={<ShoppingCart />} aria-label="cart" />
          <Tab icon={<Home />} aria-label="home" />
        </Tabs>
      </Box>

      <Box>
        <TabContext value={tab.toString()}>
          <TabPanel value="0">
            <CartTab />
          </TabPanel>
          <TabPanel value="1">
            <ProductsListTab products={data} />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}

export default App;
