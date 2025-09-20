import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {createUser, deleteMultipleUser, deleteUser, fetchAllUser, updateUser} from './userApi'

export const fetchAllUserAsync = createAsyncThunk(
    'user/fetchAllUser',
    async()=>{
        const data = await fetchAllUser();
        return data;
    }

)

export const createUserAsync = createAsyncThunk(
    'user/createUser',
    async(args)=>{
        const data = await createUser(args);
        return data;
    }
)

export const updateUserAsync = createAsyncThunk(
    'user/updateUser',
    async(args)=>{
        const data = await updateUser(args);
        return data;
    }
)

export const  deleteUserAsync = createAsyncThunk(
    'user/deleteUser',
    async(id)=>{
        const data = await deleteUser(id);
        return data;
    }
)

export const  deleteMultipleUserAsync = createAsyncThunk(
    'user/deleteMultipleUser',
    async(args)=>{
        const data = await deleteMultipleUser(args);
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
        .addCase(createUserAsync.pending,(state)=>{
            state.loading=true, 
            state.success=false
        })
        .addCase(createUserAsync.fulfilled,(state,actions)=>{
            state.loading=false;
            state.message=actions.payload.message
           state.success=actions.payload.success; 
        })
        .addCase(createUserAsync.rejected,(state,actions)=>{
                state.loading=false;
                state.message=actions.error.message
                state.success=false; 
        })
        .addCase(deleteUserAsync.pending,(state)=>{
            state.loading=true, 
            state.success=false
        })
        .addCase(deleteUserAsync.fulfilled,(state,actions)=>{
            state.loading=false;
            state.message=actions.payload.message
           state.success=actions.payload.success; 
           if(state.success){
            state.data=state.data.filter((u)=>u.id!==actions.payload.data.id) 
           }
        })
        .addCase(deleteUserAsync.rejected,(state,actions)=>{
                state.loading=false;
                state.message=actions.error.message
                state.success=false; 
        })
        .addCase(updateUserAsync.pending,(state)=>{
            state.loading=true, 
            state.success=false
        })
        .addCase(updateUserAsync.fulfilled,(state,actions)=>{
            state.loading=false;
            state.message=actions.payload.message
           state.success=actions.payload.success; 
           if(state.success){
            let index=state.data.findIndex((user)=>user.id===actions.payload.data.id) 
            state.data.splice(index,1,actions.payload.data) 
           }
        })
        .addCase(updateUserAsync.rejected,(state,actions)=>{
                state.loading=false;
                state.message=actions.error.message
                state.success=false; 
        })
        .addCase(deleteMultipleUserAsync.pending,(state)=>{
            state.loading=true, 
            state.success=false
        })
        .addCase(deleteMultipleUserAsync.fulfilled,(state,actions)=>{
            state.loading=false;
            state.message=actions.payload.message
            state.success=actions.payload.success;  
            const deletedUserIds = new Set(actions.payload.data.users.map(user => user.id));
            state.data=state.data.filter((user)=>!deletedUserIds.has(user.id))
        })
        .addCase(deleteMultipleUserAsync.rejected,(state,actions)=>{
                state.loading=false;
                state.message=actions.error.message
                state.success=false; 
        })
    }

})

export const loading = (state) => state.user.loading
export const success = (state) => state.user.success
export const message = (state) => state.user.message
export const data = (state) => state.user.data

export default userSlice.reducer