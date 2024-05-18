
import { FaDonate } from "react-icons/fa";
import { FaGuitar,FaCar} from "react-icons/fa6";
import { MdFastfood } from "react-icons/md";
import Amount from "./Amount";
const Item = ({amount,name,date,iconId}) =>{
    
    return ( <ul className="item_box_control">
            <li    
                    className={`${iconId === 1? 'bg-orange-200': 
                     iconId === 2 ? 'bg-green-300':
                    iconId === 3 ? 'bg-violet-400':
                    ' bg-rose-400' } transition_items`}>
                 <h4 className='item_icon'>
                 {
                     iconId === 1 ? < MdFastfood /> : 
                     iconId ===2 ? <FaDonate/> :
                     iconId === 3 ? <FaCar /> :
                      <FaGuitar/>
                 }
                   </h4>
                   <div className="item_title">
                        <h5 >{name}</h5>
                        <span>{date}</span>
                        
                    </div>
                    <Amount amt={amount}/>
                        
            </li>
            </ul>
    )
}
export default Item;