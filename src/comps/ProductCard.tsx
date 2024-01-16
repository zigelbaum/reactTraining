import { Card, CardContent, CardActions, CardMedia, Button, Typography } from '@mui/material';
import { Info, ShoppingCart } from '@mui/icons-material';

import Product from '../types/Product';

interface ProductCardProps{
    product: Product;
    handleInfoClicked: (product: Product) => void;
    handleAddToCart: (product: Product) => void;
}

const ProductCard = (props: ProductCardProps) => {
    return (
        <Card sx={{ width: 300, height: 345, display: 'flex', flexDirection: 'column' }}>
            <CardMedia
                component="img"
                image={props.product.image}
                sx={{ maxHeight: 140, width: '100%' }}
                alt={props.product.name}
                title={props.product.name}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" gutterBottom component="div" sx={{ textAlign: 'center' }}>
                    {props.product.name}
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ textAlign: 'center' }}>
                    {props.product.price}₪
                </Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto' }}>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<Info />}
                    sx={{ margin: '10px' }}
                    onClick={() => props.handleInfoClicked(props.product)}>
                    פרטים
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ShoppingCart />}
                    sx={{ margin: '10px' }}
                    onClick={() => props.handleAddToCart(props.product)}
                >
                    הוסף לעגלה
                </Button>
            </CardActions>
        </Card>
    )
}

export default ProductCard