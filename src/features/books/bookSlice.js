import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createBook, getBook, getBooks, updateBook } from "./bookAPI"

const initialState = {
    books:[],
    book:null,
    loading:false
}
export const createBookAsync=createAsyncThunk(
    'books/create',
    async({token,payload})=>{
       
        const response=await createBook(token,payload);
        return response.data;
    }
)
export const  getBooksAsync=createAsyncThunk(
    'books/getBooks',
    async()=>{
        const response=await getBooks();
        return response.data;
    }
)
export const getBookAsync = createAsyncThunk(
    'books/getBook',
    async(id)=>{
        const response = await getBook(id);
        return response.data;
    }  
)
export const updateBookAsync = createAsyncThunk(
    'books/updateBook',
    async({id,token,data})=>{
        const response=await updateBook(id,token,data);
        return response.data;
    }
)
export const bookSlice = createSlice({
    name:'book',
    initialState,
    extraReducers:(builder)=>{
        builder
        .addCase(createBookAsync.pending, (state,action) =>{
            state.loading=true;
        })
        .addCase(createBookAsync.fulfilled, (state,action) => {
            state.loading=false;
            state.books.push(action.payload);
        })
        .addCase(getBooksAsync.pending, (state,action) => {
            state.loading=true;
        })
        .addCase(getBooksAsync.fulfilled, (state,action) => {
            state.loading=false;
            state.books=action.payload;
        })
        .addCase(getBookAsync.pending, (state,action) => {
            state.loading=true;
        })
        .addCase(getBookAsync.fulfilled, (state,action) => {
            state.loading=false;
            state.book=action.payload;
        })
        .addCase(updateBookAsync.pending, (state,action) => {
            state.loading=true;
        })
        .addCase(updateBookAsync.fulfilled, (state,action) => {
            state.loading=false;
            state.book=action.payload
        })
    }
})
export default bookSlice.reducer;