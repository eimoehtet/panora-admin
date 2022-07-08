import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getOrderDetails, getOrders } from "./orderAPI"

const initialState = {
    orders : [],
    order:null,
    loading : false
}
export const getOrdersAsync = createAsyncThunk(
    'orders',
    async(token)=>{
        const response=await getOrders(token);
        return response.data;
    }
)
export const getOrderDetailAsync = createAsyncThunk(
    'orders/detail',
    async({id,token})=>{
        const response=await getOrderDetails(id,token);
        return response.data;
    }
)
export const orderSlice = createSlice({
    name:'orders',
    initialState,
    extraReducers:(builder)=>{
        builder
        .addCase(getOrdersAsync.pending, (state,action) =>{
            state.loading=true
        })
        .addCase(getOrdersAsync.fulfilled, (state,action) =>{
            state.loading=false
            state.orders=action.payload
        })
        .addCase(getOrderDetailAsync.pending, (state,action) =>{
            state.loading=true
            
        })
        .addCase(getOrderDetailAsync.fulfilled, (state,action) => {
            state.loading=false
            state.order=action.payload
        })
    }
}
)
export default orderSlice.reducer;