import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { login } from "./authAPI"

const accessToken=localStorage.getItem('token');
const initialState = {
    isLoggedIn:accessToken ? true : false,
    token:accessToken,
    loading:false
}
export const loginAsync = createAsyncThunk(
    'auth/login',
    async({mobileNumber,password})=>{
        const response=await login(mobileNumber,password);
        return response.data;
    }

)
export const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        logout : (state) =>{
            state.isLoggedIn=false;
            state.token=null;
            localStorage.removeItem('token')    
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(loginAsync.pending, (state,action) => {
            state.loading=true;
            state.isLoggedIn=false;
            state.token=null;
        })
        .addCase(loginAsync.fulfilled, (state,action) => {
            state.loading=false;
            state.isLoggedIn=true;
            state.token=action.payload.accessToken;
            localStorage.setItem('token',action.payload.accessToken)
        })
    }
})
export const {logout} = authSlice.actions;

export default authSlice.reducer;