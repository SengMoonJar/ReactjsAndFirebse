import { HiArrowRight} from "react-icons/hi";
import { Link } from 'react-router-dom';
const MonthlyControl = () =>{
    return(
        <div className='mothly_data_section'>
                    <div className='monthly_data_header'>
                            <h3 className="header-title">Monthly Data</h3>
                            <Link to='/monthlydata'><p><HiArrowRight className="icon-control"/></p></Link>
                        
                    </div>
                    <div className='monthly_data_body'>
                        <div className="monthly_received_control">
                            <h4>Received</h4>
                            <p>500K</p>
                        </div>
                        <div className="monthly_spent_control">
                            <h4>Spent</h4>
                            <p>300K</p>
                        </div>
                        <div className="monthly_remain_control">
                            <h4>Remain</h4>
                            <p>200K</p>
                        </div>
                    </div>
                </div>
    )
}
export default MonthlyControl;