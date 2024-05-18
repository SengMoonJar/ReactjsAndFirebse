import './EachMonthData.css';
import { FaArrowLeftLong} from "react-icons/fa6";
import { Link, useParams } from 'react-router-dom';
import Item from '../Item/Item';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch} from 'react-redux';
import { fetchExpense, fetchMonthlyData } from '../features/ItemSlice/ItemSlice';
const EachMonthData = () =>{
    const dispatch = useDispatch();
    const {monthIndex} = useParams();
    useEffect(
        ()=>{
            dispatch(fetchExpense())
        }
    ,[])
        const items = useSelector((state)=>state.itemReducer.items);
        const showItems = items.map((item,key)=>{
            const iDate = new Date(item.expense.date);
            return iDate.getMonth() === parseInt(monthIndex,10);
        })
     console.log('show items',showItems);
    return (
        <div className="transition-control">
            <div className="transition-title">
                <Link to='/'><p className='each-month-header-icon'><FaArrowLeftLong/></p></Link >
                <h3 className="each-month-header-title">January's Transactions</h3>
                
            </div>
            <ul className="item_box_control">
                    {
                        showItems? ( showItems.map((item) => {return(
                                <Item  amount={item.expense.amount } 
                                title={item.expense.title} 
                                iconId={item.expense.iconId}
                                 date={item.expense.date}/>
                            )
                        }
                        )
                        )
                        :
                        <h5>No Data........</h5>
                    
                    }
             </ul>
            
        </div>
    )
}
export default EachMonthData;