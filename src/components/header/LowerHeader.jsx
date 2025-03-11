import React from 'react';
import { Menu } from '@mui/material';
import classes from './Header.module.css';
const LowerHeader = () => {
  return (
    <div className={classes.lower__container}>
        <ul>
            <li>
                <Menu />
                <p>All</p>
            </li>
            <li>Today's Deal</li>
            <li>Customer Service</li>
            <li>registry</li>
            <li>Gift Cards</li>
            <li>Sell</li>
        </ul>
    </div>
  )
}

export default LowerHeader;