import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {fetchAllUser} from './userApi'

export const fetchAllUserAsync = createAsyncThunk(
    'user/fetchAllUser',
    async()=>{
        const data = await fetchAllUser();
        return data;
    }

)

const initialState= { 
    loading:false,
    success:false,
    message:null,
    data:[]
  };

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchAllUserAsync.pending,(state)=>{
            state.loading=true, 
            state.success=false
        })
        .addCase(fetchAllUserAsync.fulfilled,(state,actions)=>{
            state.loading=false;
            state.success=true;
            if(actions.payload.success){
                state.message=actions.payload.message 
                state.data=actions.payload.data 
            }else{
                state.message=actions.payload.message
                state.data=[]
            }
        })
        .addCase(fetchAllUserAsync.rejected,(state,actions)=>{
                state.loading=false;
                state.message=actions.error.message
                state.success=false;
                state.data=[]
            })
    }

})

export const loading = (state) => state.user.loading
export const success = (state) => state.user.success
export const message = (state) => state.user.message
export const data = (state) => state.user.data

export default userSlice.reducer