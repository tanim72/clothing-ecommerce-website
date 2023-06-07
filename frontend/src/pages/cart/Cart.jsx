import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import CartQuantity from './CartQuantity';
import { List, ListItem, ListItemText, IconButton, Button, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const cartId = 'pU6YrRuSDYwBchVp2p68';
  const [cartItems, setCartItems] = useState([]);
  const { setNumberOfItemsInCart } = useContext(CartQuantity);
  const navigate = useNavigate();
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

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

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:9000/cart/${cartId}/${itemToDelete}`);
      setCartItems(cartItems.filter(item => item.id !== itemToDelete));
      let quantity = 0;
      cartItems.forEach(item => {
        if (item.id !== itemToDelete) {
          quantity += item.quantity;
        }
      });
      setNumberOfItemsInCart(quantity);
      setDeleteConfirm(false);
    } catch (error) {
      console.error(`Error deleting item: ${error}`);
    }
  };

  const openDeleteConfirm = (itemId) => {
    setItemToDelete(itemId);
    setDeleteConfirm(true);
  };

  const closeDeleteConfirm = () => {
    setItemToDelete(null);
    setDeleteConfirm(false);
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
            <IconButton onClick={() => openDeleteConfirm(item.id)}><Delete /></IconButton>
          </ListItem>
        ))}
      </List>
      <Button variant="contained" color="primary" onClick={() => navigate('/checkout')}>Proceed to Checkout</Button>

      <Dialog open={deleteConfirm} onClose={closeDeleteConfirm}>
        <DialogTitle>{"Delete Item"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this item from your cart?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteConfirm}>Cancel</Button>
          <Button onClick={handleDelete} color="primary">Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Cart;
