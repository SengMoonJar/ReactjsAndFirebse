import './MonthlyData.css';
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import DataItem from './DataItem';
import { useDispatch, useSelector } from 'react-redux';
import {fetchExpense, fetchMonthlyData} from '../features/ItemSlice/ItemSlice';
const MonthlyData = () =>{
    const [filterYear, setFilterYear] = useState('2024');
    const filterYearHandler =(event) =>{
        setFilterYear(event.target.value);
    }
    // console.log('filter year',filterYear);
    
    const dispatch = useDispatch();
    useEffect(
        ()=>{
            dispatch(fetchExpense(),fetchMonthlyData())
        }
    ,[])
        const monthlyData = useSelector((state)=>state.itemReducer.monthly);
        // console.log('monthy data ',monthlyData);
    const allItem = useSelector((state)=>state.itemReducer.items);

    const filteredItems = allItem.filter((i)=>{
        const item = new Date(i.expense.date);
        // console.log('year',item.getFullYear());
           return item.getFullYear().toString() === filterYear 
    });
    const dates = filteredItems.map(item => new Date(item.expense.date));
    const latestDate = new Date(Math.max.apply(null, dates));
    //    console.log('latest date',latestDate)
    // Filter data to get items with the latest date
    const latestDatesArray = filteredItems.filter(item => new Date(item.expense.date).getTime() < latestDate.getTime());
    
   const finalItems = latestDatesArray;
//    console.log('filter latest data', finalItems);
    return(
        <div className="monthly_data">
            <div className="monthly-data-header">
                < Link to='/home'><p className='data-icon'><FaArrowLeftLong/></p></Link >
                <h3 className="monthly-data-header-title">Monthly Data</h3>
                <div className="filter_year">
                    <select onChange={filterYearHandler}>
                        <option  value='Select Year'>Select Year</option>
                        <option value='2022'>2022</option>
                        <option value='2023'>2023</option>
                        <option value='2024'>2024</option>
                    </select>
                </div>
            </div>
            <div className='data_section'>
                <ul className='data_list'>
                    {
                        monthlyData.mdata.monthlyData.length !== 0? (monthlyData.mdata.monthlyData.map((item,key)=>{
                            if(item.received !== 0 && item.reamin !== 0 && item.spend !== 0 ){
                              return (
                                <DataItem index={key} 
                            received={item.received}
                            spend={item.spend}
                            remain={item.remain}
                            transactionItems= {item.transactionItems}
                            />
                            )}
                            
                        }           
                         )
                                 ):
                                 
                        (<h3 className='text-2xl text-black'>No Transition is found.</h3>)
                    }
                    
                </ul>
            </div>
        </div>
    )
}
export default MonthlyData;