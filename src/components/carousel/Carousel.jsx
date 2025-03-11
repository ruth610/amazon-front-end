import React from 'react'
import { img} from './img/data';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import classes from './Carousel.module.css';
const CarouselE = () => {
  return (
    <div className={classes.hero__container}>
        <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicator={false}
        showThumbs={false}
        dots={false}
        >
            {
                img.map((items,index)=>{
                    return <img key={index} src={items} alt="" />
                })
            }
        </Carousel>
        <div className={classes.hero__img}></div>
    </div>
  )
}

export default CarouselE;