import React, { useState,useEffect } from 'react'
import classes from './product.module.css'
import LayOut from '../../components/layout/LayOut';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/product/ProductCard';
import axios from 'axios';
import { productBaseUrl } from '../../../Api';
import Loader from '../../components/loader/Loader';
const Product = () => {
    const {productId} = useParams()
    const [product ,setProduct] = useState()
    const [loading,setLoading] = useState(false)
    useEffect(()=>{
        setLoading(true)
        axios.get(`${productBaseUrl}/${productId}`)
        .then((res)=>{
            setProduct(res.data);
            setLoading(false);
        })
        .catch((err)=>{
            console.log(err);
            setLoading(false);
        })
    },[]);
  return (
        <LayOut>
            <div className={classes.product__detail}>
                {loading?<Loader />:
                <ProductCard 
                data={product}
                flex = {true}
                renderDesc={true}
                btnShow={true}
                />
                }
            </div>
        </LayOut>
  )
}

export default Product;