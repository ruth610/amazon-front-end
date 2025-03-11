import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { data } from './data';
import classes from './Product.module.css';
import ProductCard from './ProductCard';
import Loader from '../loader/Loader';
import { productBaseUrl } from '../../../Api';

const Product = () => {
  const [product,setProduct] = useState([]);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null);
  useEffect(()=>{
    setLoading(true)
    axios.get(`${productBaseUrl}`)
    .then((res)=>{
      // console.log(res);
      setProduct(res.data)
      setLoading(false)
    }).catch((err)=>{
      console.log(err)
      setError(err.message)
      setLoading(false)
    })
  },[])
  return (
    <section className={classes.product__container}>
        {loading?<Loader />:error?<div>error</div>:(product.length > 0?(
          product.map((singleProduct)=>(
            <ProductCard data={singleProduct} key={singleProduct.id} btnShow={true}/>
          ))):<div>No Product is Available.</div>)
        }
    </section>
  )
}

export default Product;