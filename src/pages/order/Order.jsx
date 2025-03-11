import React, { useContext, useEffect, useState } from 'react'
import classes from './Order.module.css';
import LayOut from '../../components/layout/LayOut';
import { DataContext } from '../../components/dataProvider/DataProvider';
import { db } from '../../../utility/firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import ProductCard from '../../components/product/ProductCard';
const Order = () => {
  const [{user},dispatch] = useContext(DataContext);
  const [orders,setOrders] = useState([]);
    useEffect(()=>{
      if(user){
        const ordersRef = collection(db,'users',user.uid,'orders')
        const q = query(ordersRef,orderBy('created','desc'));
        const snap = onSnapshot(q,(snapshot)=>{
          console.log(snapshot);
          setOrders(snapshot.docs.map((doc)=>(
            {
              id:doc.id,
              data:doc.data(),
            }
          )))
        })
        return () => snap();
      }
      else{
        setOrders([])
      }
  },[]);
  return (
    <LayOut>
        <section className={classes.container}>
          <div className={classes.order__container}>
            <h2>Your Orders</h2>
            {orders.length <1 && <p>You don't have orders yet!!</p>}
            <div>
            {
              orders?.map((eachOrders)=>(
                // console.log(eachOrders);
                <div>
                  <hr />
                  <p>Order ID: {eachOrders.id}</p>
                  {
                    eachOrders?.data?.basket?.map((order)=>(
                      // console.log(order)
                      <ProductCard 
                        flex={true}
                        renderDesc={false}
                        data={order}
                        key={order.id}
                      />
                    ))
                  }
                </div>
              ))
            }
            </div>
          </div>
        </section>
    </LayOut>
  )
}

export default Order;