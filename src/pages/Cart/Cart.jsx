import React, { useContext } from 'react'
import classes from './Cart.module.css';
import LayOut from '../../components/layout/LayOut';
import { DataContext } from '../../components/dataProvider/DataProvider';
import ProductCard from '../../components/product/ProductCard';
import CurrencyFormat from '../../components/currencyFormat/CurrencyFormat';
import { Link } from 'react-router-dom';
import { Type } from '../../../utility/action_type';
const Cart = () => {
  const [{basket},dispatch] = useContext(DataContext);
  const total =basket.reduce((amount,item)=>{
    return item.price * item.amount + amount
  },0)
  // console.log(basket)
  const increment=(item)=>{
    dispatch({
      type: Type.ADD_TO_BASKET,
      item
    })
  }
  const decrement=(id)=>{
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id
    })
  }
  return (
        <LayOut>
          <section className={classes.cart__container}>
            <div className={classes.my_carts}>
                  <h2>Hello</h2>
                  <h3>Your Shopping Basket</h3> 
                  <hr />
                  {
                    basket.length>0?basket?.map((bask,i)=>(
                    <section key={i} className={classes.product__cart}>
                      <ProductCard data={bask}  renderDesc={true} btnShow={false}/>
                      <div className={classes.btn__container}>
                        <button onClick={()=>increment(bask)}>+</button>
                        <span>{bask.amount}</span>
                        <button onClick={()=>decrement(bask.id)}>-</button>
                      </div>
                    </section>
                    )):<div>oops! No items in your cart.</div>
                  }
            </div>
            {
                  basket.length!==0 && (
                  <div className={classes.subtotal}>
                        <div>
                          <p>Subtotal ({basket.length} items)</p>
                          <CurrencyFormat amount={total} />
                        </div>
                        <span>
                          <input type="checkbox" name="" id="" />
                          <small>This order contains a gift.</small>
                        </span>
                        <Link to={'/payment'}>
                        continue to checkout
                        </Link>
                  </div>
                  )
            }
          </section>
        </LayOut>
    
  )
}

export default Cart;