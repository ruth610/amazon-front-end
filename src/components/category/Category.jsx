import React, { useState } from 'react'
import { categoryImage } from './CategoryData';
import CategoryCard from './CategoryCard';
import classes from './category.module.css';
const Category = () => {
  return (
    <div className={classes.category__container}>
        {
            categoryImage.map((infos,index)=>(
                <CategoryCard key={index} data={infos}/>
            ))
        }
    </div>
  )
}

export default Category;