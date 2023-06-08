import React, { useState, useEffect, useContext } from 'react';
//import { useParams } from 'react-router-dom';
import axios from 'axios';
import CartQuantity from './CartQuantity';
import {
    Box, CardMedia, IconButton, Button, Typography, Dialog, DialogTitle,
    DialogContent, DialogContentText, DialogActions, Grid, Card,
    CardContent, CardActions
} from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

function Cart() {
    //const cartId = 'xjq4swtq4rPECuJHCrzhXxKGIQM2';
    const cartId = Cookies.get("uid")
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
            await axios.delete(`http://localhost:9000/cart/${cartId}/${itemToDelete.id}/${itemToDelete.size}`);
            setCartItems(cartItems.filter(item => !(item.id === itemToDelete.id && item.size === itemToDelete.size)));
            let quantity = 0;
            cartItems.forEach(item => {
                if (!(item.id === itemToDelete.id && item.size === itemToDelete.size)) {
                    quantity += item.quantity;
                }
            });
            setNumberOfItemsInCart(quantity);
            setDeleteConfirm(false);
        } catch (error) {
            console.error(`Error deleting item: ${error}`);
        }
    };


    const openDeleteConfirm = (item) => {
        setItemToDelete(item);
        setDeleteConfirm(true);
    };


    const closeDeleteConfirm = () => {
        setItemToDelete(null);
        setDeleteConfirm(false);
    };

    const updateQuantity = async (itemId, itemSize, newQuantity) => {
        if (newQuantity >= 0) {
            try {
                const { data } = await axios.patch(`http://localhost:9000/cart/${cartId}/${itemId}/${itemSize}`, { quantity: newQuantity });
                const updatedCartItems = cartItems.map(item => (item.id === itemId && item.size === itemSize) ? data : item);
                setCartItems(updatedCartItems);
                let quantity = 0;
                updatedCartItems.forEach(item => {
                    quantity += item.quantity;
                });
                setNumberOfItemsInCart(quantity);
            } catch (error) {
                console.error(`Error updating quantity: ${error}`);
            }
        }
    };


    return (
        <Grid container justifyContent="center" spacing={2}>
            {cartItems.map(item => (
                <Grid item xs={12} key={item.id}>
                    <Card>
                        <Grid container>
                            <Grid item xs={8}>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {item.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Price: ${item.price}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Size: {item.size}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <IconButton onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}><Remove /></IconButton>
                                    <Typography>{item.quantity}</Typography>
                                    <IconButton onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}><Add /></IconButton>

                                    <IconButton onClick={() => openDeleteConfirm(item)}><Delete /></IconButton>
                                </CardActions>
                            </Grid>
                            <Grid item xs={4}>
                                <Box sx={{ width: 1, height: 150, overflow: 'hidden' }}>
                                    <CardMedia
                                        component="img"
                                        image={item.url}
                                        alt={item.name}
                                        sx={{
                                            objectFit: 'contain',
                                            maxHeight: '100%',
                                            maxWidth: '100%',
                                        }}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            ))}
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
            <Grid item xs={12} align="center">
                <Button variant="contained" color="primary" onClick={() => navigate('/checkout')}>Proceed to Checkout</Button>
            </Grid>
        </Grid>
    );
}

export default Cart;