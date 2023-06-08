import React, { useState, useEffect, useContext } from 'react';
//import { useParams } from 'react-router-dom';
import axios from 'axios';
import CartQuantity from './CartQuantity';
import { List, ListItem, ListItemText, IconButton, Button, Typography } from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function Cart() {
    //const cartId = 'xjq4swtq4rPECuJHCrzhXxKGIQM2';
    const cartId = Cookies.get("uid")
    const [cartItems, setCartItems] = useState([]);
    const { setNumberOfItemsInCart } = useContext(CartQuantity);
    const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const { data } = await axios.get(`http://localhost:9000/cart/${cartId}`);
        setCartItems(data.items);
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
  }, [cartId, setNumberOfItemsInCart]);

    const deleteItem = async (itemId) => {
        try {
            await axios.delete(`http://localhost:9000/cart/${cartId}/${itemId}`);
            setCartItems(cartItems.filter(item => item.id !== itemId));
            let quantity = 0;
            cartItems.forEach(item => {
                if (item.id !== itemId) {
                    quantity += item.quantity;
                }
            });
            setNumberOfItemsInCart(quantity);
        } catch (error) {
            console.error(`Error deleting item: ${error}`);
        }
    };

    const updateQuantity = async (itemId, newQuantity) => {
        if (newQuantity >= 0) {
            try {
                const { data } = await axios.patch(`http://localhost:9000/cart/${cartId}/${itemId}`, { quantity: newQuantity });
                setCartItems(cartItems.map(item => item.id === itemId ? data : item));
                let quantity = 0;
                cartItems.forEach(item => {
                    quantity += (item.id === itemId ? newQuantity : item.quantity);
                });
                setNumberOfItemsInCart(quantity);
            } catch (error) {
                console.error(`Error updating quantity: ${error}`);
            }
        }
    };

    return (
        <div>
            <Typography variant="h4">Your Cart</Typography>
            <List>
                {cartItems.map(item => (
                    <ListItem key={item.id}>
                        <ListItemText primary={item.name} secondary={`Price: $${item.price}`} />
                        <IconButton onClick={() => updateQuantity(item.id, item.quantity - 1)}><Remove /></IconButton>
                        <Typography>{item.quantity}</Typography>
                        <IconButton onClick={() => updateQuantity(item.id, item.quantity + 1)}><Add /></IconButton>
                        <IconButton onClick={() => deleteItem(item.id)}><Delete /></IconButton>
                    </ListItem>
                ))}
            </List>
            <Button variant="contained" color="primary" onClick={() => navigate('/checkout')}>Proceed to Checkout</Button>
        </div>
    );
}

export default Cart;