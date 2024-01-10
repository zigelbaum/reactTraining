import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { Home, ShoppingCart } from '@mui/icons-material';
import { TabPanel, TabContext} from '@mui/lab';
import { Tabs, Tab, Box } from '@mui/material';
import TabList from '@mui/lab/TabList';

import './App.css';
import ProductsListTab from './comps/ProductsListTab';
import CartTab from './comps/CartTab';
import { selectUserCredit } from './reducers/userReducer'
import { selectCartTotalCount } from './reducers/cartReducer'
import CustomAppBar from './comps/customAppBar';

function App() {
  const userCredit = useSelector(selectUserCredit);
  const cartTotal = useSelector(selectCartTotalCount);

  const [tab, setTab] = useState<string>('1');

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  return (
    <div className="App">
      <CustomAppBar testid={"custom-appbar"}/>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Tabs value={tab} onChange={handleTabChange} >
          <Tab icon={<ShoppingCart />} aria-label="cart" />
          <Tab icon={<Home />} aria-label="home" />
        </Tabs>
      </Box>

      <TabContext value={tab.toString()}>
        <TabPanel value="0">
          <CartTab testid={"cart-tab"}/>
        </TabPanel>
        <TabPanel value="1">
          <ProductsListTab testid={"products-tab"}/>
        </TabPanel>
      </TabContext>
    </div>
  );
}

export default App;
