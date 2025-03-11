const dotenv = require('dotenv');
dotenv.config();
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require('express');

const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_KEY)
 
const app =express();
app.use(express.json());
app.use(cors({origin:true}));
app.get('/',(req,res)=>{
    res.status(200).json({
        message: 'success!!',
    })
});
app.post('/payment/create',async (req,res)=>{
    const total = parseInt(req.query.total)
    if(total > 0){
        const paymentIntent = await stripe.paymentIntents.create({
            amount:total,
            currency:'usd',
        }); //Creates a payment request.
        res.status(201).json({
            clientSecret:paymentIntent.client_secret,
        }); // Purpose: Frontend uses clientSecret to complete the payment.

    }
    else{
        res.status(403).json({
            message: 'total must be greater than 0'
        })
    }
})
exports.api = onRequest(app)
// onRequest(app) → Turns the Express app into a Firebase Cloud Function.
// The function is deployed as https://clone-evangadi.cloudfunctions.net/api.