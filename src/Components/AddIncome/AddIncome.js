
import './AddIncome.css';
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { addIncome, addIncomeAmount } from '../features/ItemSlice/ItemSlice';
const AddIncome = ()=>{
    const {
        register,
        formState: {errors},
        handleSubmit,
        reset
    } = useForm();

    const dispatch = useDispatch();
    const submitHandler = (data) =>{
        const incomeAmount = parseInt(data.income);
        const date= data.date;
       const newIncome = {incomeAmount,date}
        dispatch(addIncomeAmount(newIncome));
       reset({
        income:'',
        date:''
       })
    }
    return (
    <div className='add_income_form'>
        <div className="form_header">
             <Link to='/home'><p><FaArrowLeftLong/></p></Link >
             <h3>Add Income</h3>
        </div>
        <form onSubmit={handleSubmit(submitHandler)} className='form_section'>
              <label >Income</label>
                <input 
                placeholder="......Ks" 
                id="income"
                type='number'
                {...register('income',
                {required:"Income is required"})
                } />
                {
                    errors.income && <p className='err-message'>{errors.income.message}</p>
                
                }
           
                <label >Date</label>
                <input 
                type='date' 
                placeholder="dd-mm-yy"
                {...register('date',
                {required:"Date is required"})
                }
                />
                {
                    errors.date && <p className='err-message'>{errors.date.message}</p>
                
                }
                <div >
                    <button type='submit' className='submit-btn'>
                        Save
                    </button>
                </div>
               
        </form>
        
    </div>
   
)
}
export default AddIncome;