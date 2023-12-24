import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardContent, CardActions, CardMedia, Button, 
          Typography, Grid, LinearProgress, Box } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import Product from '../types/Product'
import { addToCart } from '../reducers/cartReducer';
import ProductInfo from './ProductInfo';

const ProductsListTab = () => {

  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
  const [openInfo, setOpenInfo] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadDataWithDelay().then((data: Product[] | null) => {
      if (data) {
        setProducts(data);
        setLoading(false);
      }
    });
  }, []);

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

  const loadDataWithDelay = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const module = await import('../data/products.json');
    const data: Product[] = module.default;

    return data;
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
              <Card sx={{ width: 300, height: 345, display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  image={p.image}
                  sx={{ maxHeight: 140, width: '100%' }}
                  alt={p.name}
                  title={p.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" gutterBottom component="div" sx={{ textAlign: 'center' }}>
                    {p.name}
                  </Typography>
                  <Typography variant="h6" color="text.secondary" sx={{ textAlign: 'center' }}>
                    {p.price}₪
                  </Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto' }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<InfoIcon />}
                    sx={{ margin: '10px' }}
                    onClick={() => handleInfoClicked(p)}>
                    פרטים
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ShoppingCartIcon />}
                    sx={{ margin: '10px' }}
                    onClick={() => handleAddToCart(p)}
                  >
                    הוסף לעגלה
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        )}
      <ProductInfo product={selectedProduct} open={openInfo} onOrderClick={handleAddToCart} onCloseClick={handleClose} />
    </>
  );
};

export default ProductsListTab;
