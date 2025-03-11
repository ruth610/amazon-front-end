import React, { useEffect, useState } from 'react'
import classes from './Results.module.css'
import LayOut from '../../components/layout/LayOut';
import { useParams } from 'react-router-dom';
import { productBaseUrl } from '../../../Api';
import axios from 'axios';
import Product from '../../components/product/ProductCard';
import Loader from '../../components/loader/Loader';
const Results = () => {
    const {categoryName} = useParams();
    const [singleProduct,setSingleProduct] = useState([])
    const [loading,setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true)
        axios.get(`${productBaseUrl}/category/${categoryName}`)
        .then((res)=>{
            setSingleProduct(res.data);
            setLoading(false);
        }).catch((err)=>{
            console.log(err);
            setLoading(false);
        })
    },[])
  return (
    <LayOut>
        <section className={classes.results}>
            <div className={classes.result__title}>
                <h1 style={{padding: '30px'}}>Results</h1>
                <p style={{padding: '30px'}}>Category / {categoryName}</p>
            </div>
            <hr />
            {loading?<Loader />:<div className={classes.product__container}>
                {
                    singleProduct.map((items)=>(
                        <Product data={items} key={items.id} btnShow={true}/>
                    ))
                }
            </div>}
            
        </section>
    </LayOut>
  )
}

export default Results;