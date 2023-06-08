import React, {useState} from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import {TextField, CardContent, Card, Button,ThemeProvider, createTheme, Typography} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {styled} from '@mui/system';
import CardInput from './CardInput';
import "./Checkout.css";


export default function PaymentForm() {
    const theme = createTheme({
        typography: {
            fontFamily: '"Poppins", sans-serif',
            fontWeight: 400,
            fontStyle: 'normal',
        },
    });
    const [success, setSuccess] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    // State
    const [email, setEmail] = useState('');

    const useStyles = styled({
        root: {
          maxWidth: 500,
          margin: '35vh auto',
        },
        content: {
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'flex-start',
        },
        div: {
          display: 'flex',
          flexDirection: 'row',
          alignContent: 'flex-start',
          justifyContent: 'space-between',
        },
        button: {
          margin: '2em auto 1em',
        },
      });

      const classes = useStyles();
  

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card", 
            card: elements.getElement(CardElement)
        })

    if(!error) {
        try {
            const {id} = paymentMethod;
            const response = await axios.post("http://localhost:9000/payment", {
                amount: 1000,
                id
            });

            console.log(response);
            // setSuccess(true);

            if(response.data.success) {
                console.log("succesful payment");
                setSuccess(true);
            }

        } catch (error) {
            console.log("Error", error);

        }
    } else {
        console.log(error.message);
    }
}

    return (
        <ThemeProvider theme={theme}>
        <>
        {!success ?
        <Card className={classes.root}>
        <CardContent style = {{backgroundColor: '#f4a261'}} className={classes.content}>
            <div class="wrapperShop">
            <Typography style = {{marginTop:20}} variant="h5">Pay With Stripe</Typography>
            </div>
          <TextField
            label='Alternate Email (optional)'
            style = {{backgroundColor: '#ffffff'}}
            id='outlined-email-input'
            margin='normal'
            variant='outlined'
            type='email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <CardInput />
          <div className={classes.div}>
            <Button variant="contained" style = {{backgroundColor: '#2a9d8f', color: 'white', marginTop:20}} color= "primary" className={classes.button} onClick={handleSubmit}>
              Pay
            </Button>
           </div>
        </CardContent>
      </Card>
        : 
        <div style = {{backgroundColor: '#f4a261'}} class="wrapperShop">
            <Typography style = {{paddingTop:20}} variant="h5">Your Payment Was Succesful!</Typography>
            <Button style={{ backgroundColor: '#2a9d8f', color: 'white', marginTop:20, marginBottom:20 }} onClick = {() => navigate('/')} color="primary">Continue Shopping</Button>

        </div>
        }
        </>
        </ThemeProvider>
    )
}
