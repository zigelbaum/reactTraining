import { useState } from 'react';

import { Home, ShoppingCart } from '@mui/icons-material';
import { TabPanel, TabContext } from '@mui/lab';
import { Tabs, Tab, Box } from '@mui/material';

import ProductsListTab from './ProductsListTab';
import CartTab from './CartTab';
import CustomAppBar from './customAppBar';

const MainPage = () => {

    const [tab, setTab] = useState<string>('1');

    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue);
    };

    return (
        <div>
            <CustomAppBar testid={"custom-appbar"} />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Tabs value={tab} onChange={handleTabChange} >
                    <Tab icon={<ShoppingCart />} aria-label='cart' />
                    <Tab icon={<Home />} aria-label='home' />
                </Tabs>
            </Box>

            <TabContext value={tab.toString()}>
                <TabPanel value='0'>
                    <CartTab testid={"cart-tab"} />
                </TabPanel>
                <TabPanel value='1'>
                    <ProductsListTab testid={"products-tab"} />
                </TabPanel>
            </TabContext>
        </div>
    )
}

export default MainPage