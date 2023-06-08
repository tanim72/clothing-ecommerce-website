import React, {useState} from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
// stripe
// Util imports
import {styled} from '@mui/system';
// Custom Components
import CardInput from './CardInput';
import "./Checkout.css";

<<<<<<< HEAD
// const appearance = {
//     theme: 'stripe'
//   };
const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}
=======

// const CARD_OPTIONS = {
// 	iconStyle: "solid",
// 	style: {
// 		base: {
// 			iconColor: "#c4f0ff",
// 			color: "#fff",
// 			fontWeight: 500,
// 			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
// 			fontSize: "16px",
// 			fontSmoothing: "antialiased",
// 			":-webkit-autofill": { color: "#fce883" },
// 			"::placeholder": { color: "#87bbfd" }
// 		},
// 		invalid: {
// 			iconColor: "#ffc7ee",
// 			color: "#ffc7ee"
// 		}
// 	}
// }
>>>>>>> 167c3b6575ecf9398d39ca602456c870cab85742

export default function PaymentForm() {
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
            const response = await axios.post("https://forgedfashion-backend.onrender.com/payment", {
                amount: 1000,
                id
            });

            console.log(response);
            setSuccess(true);

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
        <>
        {!success ?
        <Card className={classes.root}>
        <CardContent className={classes.content}>
            <div class="wrapperShop">
            <h1>Pay with Stripe</h1>
            </div>
          <TextField
            label='Email'
            id='outlined-email-input'
            helperText={`Alternate email to recive updates on delivery (optional)`}
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
        <div class="wrapperShop">
            <h1>Your Payment Was Succesful!</h1>
            <Button style={{ backgroundColor: '#2a9d8f', color: 'white' }} onClick = {() => navigate('/')} color="primary">Continue Shopping</Button>

        </div>
        }
        </>
    )
}

// font-family: 'Poppins', sans-serif;
// 	font-weight: 400;
// 	color: #e76f51;
// 	text-align: center;