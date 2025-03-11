import { useContext, useEffect } from "react";
import Routering from "../Routering";
import { auth } from "../utility/firebase";
import { DataContext } from "./components/dataProvider/DataProvider";
import { Type } from "../utility/action_type";
function App() {
  const [{user} ,dispatch] = useContext(DataContext)
  useEffect(()=>{
    auth.onAuthStateChanged((userchange)=>{
      if (userchange){
        dispatch({
          type:Type.SET_USER,
          user:userchange,
        })
      }else{
        dispatch({
          type:Type.SET_USER,
          user:null
        })
      }
    })
  },[]);
  return (
    <>
        <Routering />
    </>
  )
}

export default App
