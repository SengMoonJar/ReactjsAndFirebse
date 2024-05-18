import { configureStore } from "@reduxjs/toolkit";
import itemReducer from '../ItemSlice/ItemSlice';
import incomeReducer from '../IncomeSlice/IncomeSlice';
export const Store = configureStore({
    reducer:{
        itemReducer,
    }
})