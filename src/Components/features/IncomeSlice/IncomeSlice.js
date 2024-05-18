import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc,getDocs, collection, QuerySnapshot } from "firebase/firestore";
import db from "../../../config/fbconfig";

export const addIncome = createAsyncThunk(
    'income/addIncome',
    async (newIncome) =>{
        const ref = await addDoc(collection(db,'income'),newIncome);
        // const finalIncome = {id:ref.id, newIncome};
        // console.log('newIncome',finalIncome);
        // return finalIncome;
        return newIncome;
    }
)
export const fetchIncome = createAsyncThunk(
    'income/fetchIncome',
    async () =>{
        const querySnapshot = await getDocs(collection(db,'income'));
        // const income = querySnapshot.docs.map(doc => doc.data());
        // return income;
        console.log(querySnapshot)
    }
)
// export const addIncome = createAsyncThunk(
//     'income/addIncome',
//     async (newIncome, thunkAPI) => {
//         try {
//             const ref = await addDoc(collection(db,'income'), newIncome);
//             const finalIncome = { id: ref.id, ...newIncome };
//             console.log('newIncome', finalIncome);
//             return finalIncome;
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error.message); // Reject the promise with an error message
//         }
//     }
// );

// export const fetchIncome = createAsyncThunk(
//     'income/fetchIncome',
//     async (_, thunkAPI) => {
//         try {
//             const querySnapshot = await getDocs(collection(db,'income'));
//             const new_income = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//             return new_income;
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error.message); // Reject the promise with an error message
//         }
//     }
// );


export const incomeSlice = createSlice({
    name: 'income',
    initialState : {
        income : []
        },
   
    extraReducers:
    (builder) =>{
        builder
        .addCase(addIncome.fulfilled, (state,action)=>{
            state.income.push(action.payload);
        })
        .addCase(fetchIncome.fulfilled,(state,action)=>{
            state.income = action.payload;
        })
    } 
})

export default incomeSlice.reducer;