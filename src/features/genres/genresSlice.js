import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createGenre, getGenre, getGenres, updateGenre } from "./genresAPI"

const initialState={
    genres:[],
    genre:null,
    loading:false
}
export const createGenresAsync=createAsyncThunk(
    'genres/createGenres',
    async({token,genere})=>{
        
        const response=await createGenre(token,genere);
        return response.data;
    }

)
export const getGenresAsync=createAsyncThunk(
    'genres/getGenres',
    async()=>{
        const response=await getGenres();
        return response.data;
    }

)
export const getGenreAsync=createAsyncThunk(
    'genres/getGenre',
    async(id)=>{
        const response=await getGenre(id);
        return response.data;
    }
)
export const updateGenresAsync=createAsyncThunk(
    'genres/updateGenre',
    async({id,token,data})=>{
        const response=await updateGenre(id,token,data);
        return response.data;
    }
)

export const genresSlice = createSlice({
    name:'genres',
    initialState,
    extraReducers:(builder)=>{
        builder
        .addCase(createGenresAsync.pending,(state)=>{
            state.loading=true;
        })
        .addCase(createGenresAsync.fulfilled, (state,action) => {
            state.genres.push(action.payload);
            state.loading=false
        })
        .addCase(getGenresAsync.pending, (state)=>{
            state.loading=true;
        })
        .addCase(getGenresAsync.fulfilled, (state,action)=>{
            state.genres=action.payload;
            state.loading=false;
        })
        .addCase(getGenreAsync.pending, (state)=>{
            state.loading=true;
        })
        .addCase(getGenreAsync.fulfilled, (state,action)=>{
            state.genre=action.payload;
            state.loading=false;
        })
        .addCase(updateGenresAsync.pending, (state)=>{
            state.loading=true;
        })
        .addCase(updateGenresAsync.fulfilled, (state,action)=>{
            state.genres=state.genres.map(genre=>{
                if(genre.id === action.payload.id){
                    return action.payload;
                }else{
                    return genre;
                }
            })
        })
    }
})
export default genresSlice.reducer;