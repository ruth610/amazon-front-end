import React, { useContext } from 'react';
import Rating from '@mui/material/Rating';
import CurrencyFormat from '../currencyFormat/CurrencyFormat';
import classes from './Product.module.css';
import { Link } from 'react-router-dom';
import { DataContext } from '../dataProvider/DataProvider';
import { Type } from '../../../utility/action_type';
const ProductCard = ({data,flex,renderDesc,btnShow}) => {
    if(!data){
        return null
    }
    const {id,image,title,rating,price,description} = data;
    const [state,dispatch] = useContext(DataContext);
    // console.log(state);
    const Add_to_cart=()=>{
        dispatch({
            type:Type.ADD_TO_BASKET,
            item:{ id,image,title,rating,price,description }
        })
    }
  return (
    <div className={`${classes.card__container} ${flex?classes.product__flexed:''}`}>
        <Link to={`products/${id}`}>
            <img src={image} alt="" />
        </Link>
        <div className={classes.product__info}>
                <div className={classes.title}>
                    <h2 style={{fontSize: '20px'}}>{title}</h2>
                    {renderDesc && <div style={{maxWidth:'500px'}}>{description}</div>}
                    <div className={classes.rating}>
                        <Rating value={rating?.rate || 0} precision={0.1}/>
                        <small>{rating?.count || 0}</small>
                    </div>
                    
                </div>
                <div className={classes.price}>
                    {/* price  */}
                    <CurrencyFormat amount={price}/>
                </div>
                {btnShow?<button className={classes.card__btn} onClick={Add_to_cart}>
                    add to cart
                </button>:''}
        </div>
        
    </div>
  )
}

export default ProductCard;