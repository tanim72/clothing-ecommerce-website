# Forged Fashion
Forged Fashion is a completely online clothing center for both men's and women’s shirts, dresses, shoes, and more. With a clean UI and easy-to-navigate pages, online shopping has never been easier!

## Table of Contents
Installation

How to Use Project

Major Components and Features

The Status of those Features

Credits

## Installation 
On your command prompt or terminal, run the following:
git clone https://github.com/ty-donovan/clothing-ecommerce-website
cd EcommerceApp
cd frontend
npm install
npm install axios
npm install firebase
npm start

On a separate command prompt or terminal, run the following:
cd EcommerceApp
cd backend
npm install
npm install axios
npm install firebase
npm start

*Note: In order for this to work, users must also setup a working Firebase web app and ensure they have a permissions.json in the backend folder, as well as necessary Spotify API keys in their own .env file.*
	
## How to Use Project
Log in or sign up to order from our website. Make sure you accept cookies, as they will help track your cart and ensure your order gets filled. Various clothing options are available in both the men’s and women’s clothing pages. Simply select the size you would like and add it to the cart. Then navigate to the cart (clicking cart icon in top right) and proceed to checkout, where Stripe will complete the transaction through a secure payment process.

## Major Components and Features
**Login Page:**
	This is where users can log in to their existing account or signup with a new account.
  
**Men’s & Women’s Product Pages:**
	This page displays the various products available for purchase, with functionality for selecting the size and adding to the cart.
  
**Cart Page:**
	Gives a summary of the products added to the cart, including product name, price, quantity, and more. Also displays the total price of the cart and allows the user to proceed to checkout.
  
**Checkout:**
	Gets relevant user information such as address and credit card number, and then completes the payment process using Stripe.

## The Status of those Features
**Login, Products, Cart** - Complete

**Checkout** - Working on fleshing it out more to match industry-standard checkout pages.

## Credits

Marcus Muntean (Software Engineer - Product Pages)

Tyler Donovan (Software Engineer - Login/Signup/Home)
  
Tanisha Mehta (Software Engineer - Stripe/Payment Processing)
  
Nihar Satasia (Software Engineer - Cart/Checkout)
