import React, { useContext, useEffect } from 'react';
import { DataContext } from '../../components/dataProvider/DataProvider';
import { useNavigate } from 'react-router-dom';

const Protected = ({children,msg,redirect}) => {
    const [{user},dispatch] = useContext(DataContext);
    const navigate = useNavigate()
    useEffect(()=>{
        if(!user){
            navigate('/auth',{state:{msg,redirect}});
        }
    },[user]);
  return children;
}

export default Protected;