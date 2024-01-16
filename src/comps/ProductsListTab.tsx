import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Grid, LinearProgress, Box } from '@mui/material';

import Product from '../types/Product'
import { addToCart } from '../reducers/cartReducer';
import ProductInfo from './ProductInfo';
import ProductCard from './ProductCard';
import useProductsFetch from '../hooks/useProductsFetch';
import BasicProps from '../basicProps';

const ProductsListTab = (props: BasicProps) => {

  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
  const [openInfo, setOpenInfo] = useState<boolean>(false);

  const [products, loading] = useProductsFetch();

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  const handleInfoClicked = (p: Product) => {
    setSelectedProduct(p);
    setOpenInfo(true);
  }

  const handleClose = () => {
    setOpenInfo(false);
  };

  return (
    <>
      {loading ?
        (<Box sx={{ marginTop: '200px' }}>
          <LinearProgress variant="indeterminate" />
        </Box>) :
        (<Grid container rowSpacing={3} columnSpacing={2} justifyContent={'center'}>
          {products?.map((p: Product) => (
            <Grid item key={p.id} >
              <ProductCard product={p} handleAddToCart={handleAddToCart} handleInfoClicked={handleInfoClicked} />
            </Grid>
          ))}
        </Grid>
        )}
      <ProductInfo product={selectedProduct} open={openInfo} onOrderClick={handleAddToCart} onCloseClick={handleClose} />
    </>
  );
};

export default ProductsListTab;
