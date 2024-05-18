import './Home.css';
import { useState } from 'react';
import { HiPlusCircle  } from "react-icons/hi";
import DialogModel from '../DialogModel/DialogModel';
import TotalAmount from '../TotalAmount/TotalAmount';
import MonthlyControl from '../MonthlyData/MonthlyControl';
import AllTransitionControl from '../AllTransitionControl/AllTransitionControl';

import {  useNavigate } from 'react-router';
const Home = () =>{
    const [dialog,setDialog] = useState(false);
   const openDialog = () =>setDialog(true);
    const closeDialog = ()=> setDialog(false);
    const navigate = useNavigate();
    return (
        <div className="home" >
            <div className="header">
                <h3 >Expense Calculator</h3>
                
               <p onClick={openDialog} ><HiPlusCircle 
                style={{
                    color:'blue'
                }}
                className={`${dialog? 'hidden' :'dialog_icon'} `}/></p>

               { dialog&& 
               (<DialogModel
                open={dialog}
                />)}
           </div>
            <div onClick={closeDialog}>
            
                <TotalAmount/>
                <MonthlyControl/>
                <AllTransitionControl/>
            </div>
    
            </div>
             
      
    )
}
export default Home;