import React from 'react'

import { Card, CardContent, CardActions, CardMedia, Button, Typography } from '@mui/material';
import { Info, ShoppingCart } from '@mui/icons-material';

import Product from '../types/Product';

interface ProductCardProps{
    p: Product;
    handleInfoClicked: (product: Product) => void;
    handleAddToCart: (product: Product) => void;
}

const ProductCard = (props: ProductCardProps) => {
    return (
        <Card sx={{ width: 300, height: 345, display: 'flex', flexDirection: 'column' }}>
            <CardMedia
                component="img"
                image={props.p.image}
                sx={{ maxHeight: 140, width: '100%' }}
                alt={props.p.name}
                title={props.p.name}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" gutterBottom component="div" sx={{ textAlign: 'center' }}>
                    {props.p.name}
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ textAlign: 'center' }}>
                    {props.p.price}₪
                </Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto' }}>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<Info />}
                    sx={{ margin: '10px' }}
                    onClick={() => props.handleInfoClicked(props.p)}>
                    פרטים
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ShoppingCart />}
                    sx={{ margin: '10px' }}
                    onClick={() => props.handleAddToCart(props.p)}
                >
                    הוסף לעגלה
                </Button>
            </CardActions>
        </Card>
    )
}

export default ProductCard