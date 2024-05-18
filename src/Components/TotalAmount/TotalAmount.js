import { useDispatch, useSelector } from "react-redux";
import {fetchExpense, fetchIncomeAmount} from "../features/ItemSlice/ItemSlice";
import { useEffect } from "react";
const TotalAmount = () =>{
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchIncomeAmount(),fetchExpense());
    },[] );

    const totalIncome = useSelector((state)=> state.itemReducer.income);
    let income =0;
    totalIncome.map((i)=> {
        income += i.ii.incomeAmount;
     }  ) ;
    const items = useSelector((state)=>state.itemReducer.items);
    let spending =0;
    items.map((item)=> {
        spending += item.expense.amount;
     }  ) ;
    // console.log('income',income)
    // console.log('total spending',spending);
    
    return(
        <div className="total_controls">
                    <div className="total_amount_control">
                        <h4>Total Amount</h4>
                        <p>
                           {income - spending}
                        </p>
                        
                    </div>
                    <div className='total_received_spent'>
                        <div className="total_received_control">
                            <h4>Received</h4>
                            <p>  { income}</p>
                        </div>
                        <div className="total_spent_control">
                            <h4>Spent</h4>
                            <p>
                               {spending}
                            </p>
                        </div>
                    </div>
                </div>
    )
}
export default TotalAmount;