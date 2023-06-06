import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from 'axios';

const cartId = 'pU6YrRuSDYwBchVp2p68';

function Navbar() {
  const [numberOfItemsInCart, setNumberOfItemsInCart] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const { data } = await axios.get(`http://localhost:9000/cart/${cartId}`);
        let quantity = 0;
        data.items.forEach(item => {
          quantity += item.quantity;
        });
        setNumberOfItemsInCart(quantity);
      } catch (error) {
        console.error(`Error fetching cart: ${error}`);
      }
    };

    fetchCartItems();
  }, []);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <Button color="inherit" component={Link} to="/">
            E-Commerce
          </Button>
        </Typography>
        <Button color="inherit" component={Link} to="/products">Products</Button>
        <Button color="inherit" component={Link} to="/cart/cartId">
          <Badge badgeContent={numberOfItemsInCart} color="error">
            <ShoppingCartIcon />
          </Badge>
        </Button>
        {/*<Button color="inherit" component={Link} to="/login">Login</Button>
        <Button color="inherit" component={Link} to="/signup">Sign Up</Button>*/}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
