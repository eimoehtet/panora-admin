import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createAuthor, getAuthor, getAuthors, updateAuthor } from './authorAPI';

const initialState = {
  author:null,
  authors: [],
  loading: false,
};
export const createAuthorAsync = createAsyncThunk(
  'author/create',
  async ({token,payload}) => {
    console.log("token:",token,"data:",payload)
    const response = await createAuthor(token,payload);
    return response.data;
  }
);
export const getAuthorsAsync = createAsyncThunk(
  'author/getAuthors',
  async()=>{
    const response =await getAuthors();
    return response.data;
  }
)
export const getAuthorAsync = createAsyncThunk(
  'author/getAuthor',
  async(id)=>{
    const response=await getAuthor(id);
    return response.data
  }
)
export const updateAuthorAsync = createAsyncThunk(
  'author/updateAuthor',
  async({id,token,data})=>{
    const response = await updateAuthor(id,token,data);
    return response.data;
  }
)

export const authorSlice = createSlice({
  name: 'author',
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(createAuthorAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAuthorAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.authors=[...state.authors,action.payload]
      })
      .addCase(getAuthorsAsync.pending, (state)=>{
        state.loading=true;
      })
      .addCase(getAuthorsAsync.fulfilled, (state,action)=>{
        state.loading=false;
        state.authors=action.payload
      })
      .addCase(getAuthorAsync.pending, (state) =>{
        state.loading=true;
      })
      .addCase(getAuthorAsync.fulfilled, (state,action) => {
        state.loading=false;
        state.author=action.payload
      })
      .addCase(updateAuthorAsync.pending, (state) => {
        state.loading=true;
      })
      .addCase(updateAuthorAsync.fulfilled, (state,action) => {
        state.loading=false;
        state.authors=state.authors.map(author=>{
          if(author.id === action.payload.id){
            return action.payload
          }
          else{
            return author;
          }
        })
        
      })
  },
});
export default authorSlice.reducer;
