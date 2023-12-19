import React, { useState } from 'react';
import { Card, CardContent, CardActions, CardMedia, Button, Typography, Grid } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Product from '../types/Product'
import { useDispatch } from 'react-redux';
import { addToCart } from '../reducers/cartReducer';
import ProductInfo from './ProductInfo';

interface ProductsListTabProps {
  products: Product[];
}

const ProductsListTab: React.FC<ProductsListTabProps> = ({ products }) => {

  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
  const [open, setOpen] = useState(false);

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  const handleInfoClicked = (p: Product) => {
    setSelectedProduct(p);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid container rowSpacing={3} columnSpacing={2} justifyContent={'center'}>
        {products.map((p: Product) => (
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
      <ProductInfo product={selectedProduct} open={open} onOrderClick={handleAddToCart} onCloseClick={ handleClose } />
    </>
  );
};

export default ProductsListTab;
