import React from 'react'
import PuffLoader from 'react-spinners/PuffLoader';
import classes from './Loader.module.css';
const Loader = () => {
  return (
    <div className={classes.loader__container}>
        <PuffLoader color='black'/>
    </div>
  )
}

export default Loader;