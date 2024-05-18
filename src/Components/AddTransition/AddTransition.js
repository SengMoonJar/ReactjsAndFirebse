import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaDonate } from "react-icons/fa";
import { FaBowlFood,FaGuitar,FaCar, FaArrowLeftLong} from "react-icons/fa6";
import { Link } from 'react-router-dom';
import './AddTransition.css';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMonthlyData, addNewExpense, fetchMonthlyData } from "../features/ItemSlice/ItemSlice";
const AddTransition = () =>{
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchMonthlyData)
    },[]); 
     const monthlyData = useSelector((state)=>state.itemReducer.monthly.mdata.monthlyData);
    // console.log('old month',monthlyData);
    let newMonthlyData = [];
    const {
        register,
        handleSubmit,
        reset,
        formState:{errors}
    } = useForm();
    
    const [iconId,setIconId] = useState(0);
   
    const handler = (data) =>{
    
        const amount = parseInt(data.amount);
        const name = data.name;
        const date = data.date;
      let monthIndex = new Date(data.date).getMonth();
        
        monthlyData.forEach((m)=>{
            let newAmount=0;
            if ( monthlyData.indexOf(m) == monthIndex){
               newAmount = m.spent + amount;
               newMonthlyData[m.id] = { 
                received:m.received,
                spend:newAmount,
                remain:m.remain
                         };
            }
            else{
                newMonthlyData[m.id] = m;
            }
        })
        console.log('new monthly data',newMonthlyData);
        const newExpense= {name,amount,date,iconId};
        console.log('added transition',newExpense)
            if (parseInt(amount) > 0 ){
                
            dispatch(addNewExpense(newExpense),addMonthlyData(newMonthlyData));
          
            reset({
                name:'',
                amount:'',
                date: ''
            })
            }  
    }
    return (
        <div className='add_transition_control'>
            <div className="form_header">
                    <Link to='/home'><p><FaArrowLeftLong/></p></Link >
                    <h3>Add Transaction</h3>
            </div>
            <form onSubmit={handleSubmit(handler)}  className='form_section'>
                <div className='category_section'>
                    <h3 className="category_header">Category</h3>
                    <ul className="category-list">
                        <li className="categories" onClick={()=>setIconId(1)}><FaBowlFood className="category-icon"/></li>
                        <li className="categories" onClick={()=>setIconId(2)}><FaDonate  className="category-icon"/></li>
                        <li className="categories" onClick={()=>setIconId(3)}><FaCar className="category-icon"/></li>
                        <li className="categories" onClick={()=>setIconId(4)}><FaGuitar className="category-icon"/></li>
                    </ul>
                </div>
                <div>
                    <label htmlFor='name'>Transaction Title</label>
                    <input 
                    placeholder="eg.Food & Drink" 
                    id="name"
                    type='text'
                    {
                        ...register('name',{
                            required:"Name is required"
                        })
                    }
                    />
                    {
                        errors.name?.type === 'required' &&  <p className='err-message'>{errors.name.message}</p>
                    }
                    <label htmlFor='amount'>Amount</label>
                    <input 
                    placeholder="eg.250,000" 
                    id='amount'
                    type='number'
                    min= '1'
                    {...register('amount',{
                        required: "Amount is required",
                        minLength : {
                            value: 1,
                            message : "Amount must be greater than zero"
                        }
                    })}
                    />
                    {
                        errors.amount && <span>  <p className='err-message'>
                            {errors.amount.message}</p></span>
                    }
                
                
                    <label >Date</label>
                    <input 
                    type='date' 
                    id
                     {
                        ...register("date",{
                            required: "Date is required"
                        })
                     }
                    />
                    {
                        errors.amount && <p className='err-message'>  
                        {errors.date.message}</p>
                    }
              
                <div className='save_section'>
                    <button type='submit'>
                        Save
                    </button>
                </div>
                </div>
            </form>
        </div>
       
    )
}
export default AddTransition;