import Item from "../Item/Item";
import { useDispatch, useSelector } from "react-redux";
import { fetchExpense, fetchIncomeAmount } from "../features/ItemSlice/ItemSlice";
import { useEffect } from "react";
import {addMonthlyData} from '../features/ItemSlice/ItemSlice';
const AllTransitionControl = () =>{
    
    const items = useSelector((state)=>state.itemReducer.items);
    // console.log(items)
    const dispatch = useDispatch();
    useEffect(
        ()=>{
            dispatch(fetchExpense(),fetchIncomeAmount())
        }
    ,[])
    const selectedItems= items.slice(0,4);
    //for MonthlyData
    const monthlyData = [];
    const allIncome = useSelector((state)=>state.itemReducer.income);
    
      // Calculate monthly data for all items
      const eachMonthSpent = new Array(12).fill(0);
      const eachMonthReceive =new Array(12).fill(0);
      const eachMonthRemain = new Array(12).fill(0);
      // received
      allIncome.forEach((income)=>{
          const expenseDate = new Date(income.ii.date);
          const month = expenseDate.getMonth() ;
          eachMonthReceive[month]  += income.ii.incomeAmount;
         
      })
      // Iterate over all items
      items.forEach((item) => {
          const expenseDate = new Date(item.expense.date);
          const month = expenseDate.getMonth() ;
          eachMonthSpent[month] += item.expense.amount;
         
      });
      //add monthly transations
      const months = Array.from({length:12}, (v,i)=> i+1);
       const eachMonthTransition = months.map((month)=>{
        const monthData = items.filter((item)=>{
            const expenseDate = new Date(item.expense.date);
            return expenseDate.getMonth()+1 === month
        });
        return {month,expenses:monthData}
       });
       
         for (let j=0;j<12;j++){
          eachMonthRemain[j] = eachMonthReceive[j] - eachMonthSpent[j];
          if (j>0){
            eachMonthReceive[j] +=  eachMonthRemain[j-1] ;
          }
        }
       
        for( let i=0; i<12; i++){
            monthlyData[i] = { 
                received:eachMonthReceive[i],
                spend:eachMonthSpent[i],
                remain:eachMonthRemain[i],
                transactionItems :eachMonthTransition[i]
        };
        }
    //console.log('monthly transations',monthlyData);
    //   console.log('monthly received 2024',eachMonthReceive);
    //   console.log('monthly remain 2024',eachMonthRemain);
      //console.log('monthly data',monthlyData);
      const dates = items.map(item => new Date(item.expense.date));
      const latestDate = new Date(Math.max.apply(null, dates));
      //    console.log('latest date',latestDate)
      // Filter data to get items with the latest date
      const latestDatesArray = items.filter(item => new Date(item.expense.date).getTime() < latestDate.getTime());
      
     console.log('filter latest data',latestDatesArray);
  useEffect(()=>{
 dispatch(addMonthlyData({monthlyData}))}
 ,[monthlyData]);
    //  console.log('all transition items',items);
    return(
        <div className="all_transcactions_control">
            <div>
                <h3  className="all_transaction_title">All Transactions</h3>
                
            </div>
            <div>
            {
                selectedItems.length   ? ( selectedItems.map((item) => {return(
                        <Item key={item.id} 
                            amount={item.expense.amount} 
                            name={item.expense.name} 
                            iconId={item.expense.iconId} 
                            date={item.expense.date}/>
                                    )})
                            ) :
                            (<h5 style={{color:'grey',
                                    fontSize:18,
                                    alignItems:'center',
                                    padding:5
                                }}>No transitions</h5>)
                          
                    
                 }
            
            </div>
                
        </div>
    )
}
export default AllTransitionControl;