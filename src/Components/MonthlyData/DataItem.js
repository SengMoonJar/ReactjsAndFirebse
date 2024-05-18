import { Link } from 'react-router-dom';
import { HiArrowRight } from "react-icons/hi";
const DataItem = ({received,spend,remain,index,transactionItems})=>{
    // console.log('transactions',transactionItems)
                let monthName = 'month';
                const monthIndex = index+1;
                                switch (monthIndex) {
                                     case 1 : 
                                     monthName = 'January';break;
                                     case 2 : 
                                 monthName = 'February';break;
                                 case 3 : 
                                 monthName = 'March';break;
                                 case 4 : 
                                 monthName = 'April';break;
                                 case 5 : 
                                 monthName = 'May';break;
                                 case 6 : 
                                 monthName = 'June';break;
                                 case 7 : 
                                 monthName = 'July';break;
                                 case 8 : 
                                 monthName = 'August';break;
                                 case 9 : 
                                 monthName = 'September';break;
                                 case 10:
                                 monthName = 'October';break;
                                 case 11 : 
                                 monthName = 'November';break;
                                 case 12 : 
                                 monthName = 'December';break;
                                 default: 
                                 monthName = 'Month'
                                }
    
    return(
        <li className='data-section-li'>
                        <div className='data_header'>
                                <h3>{
                                    monthName
                                }</h3>
                                <Link to={`eachmonthdata/${monthIndex}`}><p><HiArrowRight/></p></Link >
                        </div>
                        <div className='data_body'>
                            <div className="received_control">
                                <h4>Received</h4>
                                <p>{received}K</p>
                            </div>
                            <div className="spent_control">
                                <h4>Spent</h4>
                                <p>{spend}K</p>
                            </div>
                            <div className="remain_control">
                                <h4>Remain</h4>
                                <p>{remain}K</p>
                            </div>
                        </div>
                
        </li>
    )
}
export default DataItem;