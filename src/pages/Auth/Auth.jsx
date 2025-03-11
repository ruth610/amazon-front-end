import React, { useState ,useContext} from 'react';
import classes from './Login.module.css';
import { auth } from '../../../utility/firebase';
import { signInWithEmailAndPassword ,createUserWithEmailAndPassword} from 'firebase/auth';
import { DataContext } from '../../components/dataProvider/DataProvider';
import { Type } from '../../../utility/action_type';
import {ClipLoader} from 'react-spinners';
import { Link, useLocation, useNavigate } from 'react-router-dom';
const Auth = () => {
  const [title,setTitle]=useState('Sign In');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [error,setError] = useState('');
  const [{user},dispatch] = useContext(DataContext);
  const [loading,setLoading] = useState(false);
  const navStateData = useLocation();
  console.log(navStateData);
  const navigate = useNavigate()
  console.log(user);
  const handleClick = async (e)=>{
    e.preventDefault();
    // console.log(title);
    if(title ==='Sign In'){
        setLoading(true);
        signInWithEmailAndPassword(auth,email,password).then((userinfo)=>{
          dispatch({
            type:Type.SET_USER,
            user:userinfo.user,
          });
          setLoading(false);
          navigate(navStateData?.state?.redirect || '/');
        }).catch((err)=>{
          setError(err.message);
          setLoading(false);
        });
    }
    else{
      setLoading(true)
      createUserWithEmailAndPassword(auth,email,password).then((userinfo)=>{
        dispatch({
          type:Type.SET_USER,
          user:userinfo.user,
        });
        setLoading(false);
        navigate(navStateData?.state?.redirect || '/');
      }).catch((err)=>{
        setError(err.message);
        setLoading(false);
      });

    }
  }
    return (
    <div className={classes.login}>
      <Link to='/'>
            <img src='https://static.vecteezy.com/system/resources/previews/012/681/601/non_2x/amazon-logotype-illustration-popular-online-shoping-icon-free-png.png' alt="" className='login__logo'/>
      </Link>
      <div className={classes.login__form}>
        <h2>{title}</h2>
        <small style={{color:'red'}}>{navStateData?.state?.msg}</small>
        <form>
          {title==="Sign In"?<></>:<input type="text" placeholder='Your name' value='' className={classes.input}/>}
          <input type="text" placeholder='Your email' className={classes.input} value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <input type="text" placeholder='Your password' className={classes.input} value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <button className={classes.auth_btn} onClick={handleClick} type='submit'>{loading?<ClipLoader size={20} color='#fff'/>:title}</button>
          {error && <small style={{color: 'red'}}>{error}</small>}
          <div className={classes.help__form}>
          <div className={classes.remember}>
            <input type="checkbox" />
            <label htmlFor="">Remember me</label>
          </div>
          <p>Need help?</p>
        </div>
        </form>
        <div className={classes.form__switch}>
          {title==="Sign Up"?<p>Already have an account? <span onClick={()=>{setTitle("Sign In");}}>Sign In</span></p>:
          <p>New to Amazon? <span onClick={()=>{setTitle("Sign Up")}} >Sign Up</span></p>
          }
        </div>
      </div>
    </div>
  )
}

export default Auth;