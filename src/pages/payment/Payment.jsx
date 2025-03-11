import React, { useContext, useState } from 'react'
import classes from './Payment.module.css';
import LayOut from '../../components/layout/LayOut';
import { DataContext } from '../../components/dataProvider/DataProvider';
import ProductCard from '../../components/product/ProductCard';
import {useStripe, useElements ,CardElement} from '@stripe/react-stripe-js';
import CurrencyFormat from '../../components/currencyFormat/CurrencyFormat';
import { axiosInstance } from '../../api/axios';
import {ClipLoader} from 'react-spinners';
import { db } from '../../../utility/firebase';
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { Type } from '../../../utility/action_type';
const Payment = () => {
  const [{basket,user},dispatch] = useContext(DataContext);
  const stripe = useStripe();
  const elements = useElements();
  const [cardError , setCardError] = useState('')
  const [loader,setLoader] = useState(false);
  const navigate = useNavigate()
    const total =basket.reduce((amount,item)=>{
      return item.price * item.amount + amount
    },0)
    const handleChange = (e)=>{
      e?.error?.message?setCardError(e?.error?.message):setCardError('');
    }
    const handlePayment = async (e)=>{
      e.preventDefault()
      setLoader(true)
      // first contact the backend using the functions and the backend will send the client secret
      try {
        const response = await axiosInstance({
          method: 'POST',
          url: `/payment/create?total=${total*100}`
        });
        // console.log(response);
      //second from the front end accept the stripe confiramation
      const clientSecret = response.data?.clientSecret
      const confirmation = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          }
        }
      );
      // send the order data to the firestore database and clear the basket
      const paymentIntent = confirmation.paymentIntent;
      if (paymentIntent) {
        await setDoc(doc(db, "users", user.uid, "orders", paymentIntent.id), {
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
      }
      dispatch({
        type:Type.EMPTY_BASKET,
      })
      navigate('/order');
      setLoader(false);
      // console.log(confirmation);
      } catch (error) {
        console.log(error.message);
        setLoader(false);
      }
      
    }
  return (
        <LayOut>
          <div className={classes.payment}>
          <div className={classes.payment__header}>
            Checkout ({basket.length>0? basket.length:0}) items
          </div>
          <section className={classes.payment__method}>
            <div className={classes.flex}>
              <h3>Delivery Address</h3>
              <div>
                <div>{user?.email}</div>
                <div>123 React Lane</div>
                <div>Chicago, IL</div>
              </div>
            </div>
            <hr />
            {/* product  */}
            <div className={classes.flex}>
              <h3>Review items</h3>
              <div>
                {
                  basket?.map((item,index)=>(
                    <ProductCard data={item} flex={true} key={index}/>
                  ))
                }
              </div>
            </div >
            <hr />
            {/* payment form  */}
            <div className={classes.flex}>
              <h3>Payment</h3>
              <div className={classes.payment__car__container}>
                  <div>
                    <form onSubmit={handlePayment}>
                      {cardError?<small style={{color:'red'}}>{cardError}</small>:''}
                      <CardElement onChange={handleChange}/>

                      <div className={classes.payment__price}>
                        <div>
                          <span style={{display:'flex',gap:'10px'}}><p>Total Price</p> <CurrencyFormat amount={total} /></span>
                        </div>
                          <button type='submit' className={classes.payment_btn}>{loader ?<ClipLoader size={15} color='gray'/>:'Pay Now'}</button>
                      </div>
                    </form>
                  </div>
              </div>
            </div>
            
          </section>
          </div>
        </LayOut>
  )
}

export default Payment;