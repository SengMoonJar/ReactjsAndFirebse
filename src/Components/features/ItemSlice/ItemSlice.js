import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import db from "../../../config/fbconfig";
import { addDoc, collection,  getDoc,  getDocs, onSnapshot } from "firebase/firestore";


export const addIncomeAmount = createAsyncThunk(
    'income/addIncomeAmount',
    async (amount) => {
      const ref=  await addDoc(collection(db,'income'),amount);
      const icomeData= {id:ref.id,amount};
      return icomeData;
    }
);

export const fetchIncomeAmount = createAsyncThunk(
    'income/fetchIncomeAmount',
    async () => {
        const querySnapshot = await getDocs(collection(db, 'income'));
        const incomeData = querySnapshot.docs.map(doc => {
            const idata = doc.data();
            return {
                 id:doc.id,
                 ii : {...idata}
            }
        })
        return incomeData;
        
    }
);
export const addNewExpense = createAsyncThunk(
    'expense/addNewExpense',
    async (expense) =>{
        const ref = await addDoc(collection(db,'expense'),expense);
        const newExpense = {id:ref.id,expense};
        return newExpense;
    }
);

export const fetchExpense = createAsyncThunk(
    'expense/fetchExpense',
    async () => {
        const querySnapshot = await getDocs(collection(db,'expense'));
        const expenses = querySnapshot.docs.map((doc) => {
            const expenseData = doc.data();
            const date = expenseData.timeStamp ? expenseData.timeStamp.toDate() : null; // Convert Firestore Timestamp to JavaScript Date object
            return {
                id: doc.id,
                expense: {
                    ...expenseData,
                    timeStamp: date
                }
            };
        });
        return expenses;
    }
);

export const fetchSpending = createAsyncThunk(
    'expense/fetchSpending',
    async ()=>{
        const snapshot = await getDocs(collection(db,'expense'));
        let totalSpending = 0;
         snapshot.docs.forEach((doc)=>{
            totalSpending += doc.data().amount;
        })
       
        return totalSpending;
    }
);
export const addMonthlyData = createAsyncThunk(
    'monthly/addMonthlyData',
    async (mdata)=>{
        const ref = await addDoc(collection(db,'monthly'),mdata);
        const ddd =  {
            id : ref.id,mdata
        }
        return ddd;
    }
)
export const fetchMonthlyData =createAsyncThunk(
    'monthly/fetchMonthlyData',
    async ()=>{
        
        const snapshot = await getDoc(collection(db,'monthly'));
        const mmdata = snapshot.docs.map((doc)=>{
            const dd = doc.data();
            return {
                id:doc.id,
                monthdata : {...dd}
            }
        })
        return mmdata;
    }
    
)
const initialState = {
    items:[  
     
        ],
   spending : 0,
   income:[],
   monthly :{}
}
export const ItemSlice = createSlice({
    name : 'item',
    initialState,
    reducers :{
     },
    extraReducers :(builder) =>{
        builder
        .addCase(addNewExpense.fulfilled, (state,action)=>{
            state.items.push(action.payload);
        })
        .addCase(fetchExpense.fulfilled,(state,action)=>{
            state.items = action.payload;
        })
        .addCase(addIncomeAmount.fulfilled,(state,action)=>{
            state.income.push(action.payload);
        })
        .addCase(fetchIncomeAmount.fulfilled,(state,action)=>{
            state.income = action.payload;
        })
        .addCase(fetchSpending.fulfilled,(state,action)=>{
            state.spending = action.payload;
        })
        .addCase(addMonthlyData.fulfilled,(state,action) =>{
            state.monthly =action.payload;
        })
        .addCase(fetchMonthlyData.fulfilled,(state,action)=>{
            state.monthly = action.payload;
        })
    }

});

export default ItemSlice.reducer;
