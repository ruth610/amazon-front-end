import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Landing from './src/pages/landing/Landing';
import Auth from './src/pages/Auth/Auth';
import Product from './src/pages/productDetails/Product';
import Payment from './src/pages/payment/Payment';
import Cart from './src/pages/Cart/Cart';
import Results from './src/pages/results/Results';
import Order from './src/pages/order/Order';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import Protected from './src/pages/protected/Protected';
const stripePromise = loadStripe('pk_test_51QOaz3B3f1E8TeJO79cp7mf6wlqFjY7SYl6Sh8ZA6tYqcJ1CHiF2T4nayDEnvVx0RDnjGesjUSoFhpAYpVbixaYX00z0HwEqhW');
const Routering = () => {
  return (
       <BrowserRouter basename='/'>
            <Routes>
                <Route path='' element={<Landing />}/>
                <Route path='Auth' element={<Auth />}/>
                <Route path='order' element={
                    <Protected msg={'login to access your orders'} redirect={'/order'}>
                         <Order />
                    </Protected>
               } />
                <Route path='payment' element={
                    <Protected msg={'you must login to pay!!'} redirect={'/payment'}>
                    <Elements stripe={stripePromise} >
                         <Payment />
                    </Elements>
                    </Protected>} 
                    />
                <Route path='category/:categoryName' element={<Results />} />
                <Route path='products/:productId' element={<Product />} />
                <Route path='cart' element={<Cart />} />
            </Routes>
       </BrowserRouter> 
  )
}

export default Routering;