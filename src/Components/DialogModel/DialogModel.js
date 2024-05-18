import { HiArrowRight, HiPlusCircle  } from "react-icons/hi";
import './DialogModel.css';
import { Link, useNavigate } from "react-router-dom";
import { doSignOut } from '../firebase/auth';
const DialogModel = () =>{
    const navigate= useNavigate();
    return (
        <div className="dialog_box" >
            <ul className="dialog_controls">
                <li>
                    <Link className="link_control" to='/addIncome'>
                        <HiPlusCircle />
                        <span>Add Income</span>
                    </Link>
                </li>
                <li>
                    <Link className="link_control" to = '/addtransition'>
                        <HiArrowRight />
                        <span>Add Transition</span>
                    </Link>
                </li>
                <li>
                <button className="logout-btn"
                onClick={()=>doSignOut().then(()=>navigate('/'))}>LogOut</button>
                </li>
            </ul>
            
        </div>
    )
}
export default DialogModel;