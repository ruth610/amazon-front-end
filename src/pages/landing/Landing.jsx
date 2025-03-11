import React from 'react';
import CarouselE from '../../components/carousel/Carousel';
import Category from '../../components/category/Category';
import Product from '../../components/product/Product';
import LayOut from '../../components/layout/LayOut';

const Landing = () => {
  return (
    <div>
        <LayOut>
            <CarouselE />
            <Category />  
            <Product />
        </LayOut>
    </div>
    
  )
}

export default Landing;