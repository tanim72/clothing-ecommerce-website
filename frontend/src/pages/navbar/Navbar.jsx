import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CartQuantity from '../cart/CartQuantity';

function Navbar() {
    const { numberOfItemsInCart } = useContext(CartQuantity);

    return (
        <AppBar position="static" sx={{ backgroundColor: "#264653"}}>
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    <Button color="inherit" component={Link} to="/">
                        E-Commerce
                    </Button>
                </Typography>
                <Button color="inherit" component={Link} to="/products">Products</Button>
                <Button color="inherit" component={Link} to="/cart/:cartId">
                    <Badge badgeContent={numberOfItemsInCart} color="error">
                        <ShoppingCartIcon />
                    </Badge>
                </Button>
                <Button color="inherit" component={Link} to="/signup">Sign Up</Button>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
