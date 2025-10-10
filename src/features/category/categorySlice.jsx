import { createAsyncThunk, createSlice } from '@reduxjs/toolkit' 
import { createCategory, deleteCategory, fetchCategory } from './categoryApi';

export const fetchCategoryAsync = createAsyncThunk(
    'category/fetchCategory',
    async()=>{
         const data= await fetchCategory();  
         return data;
    }
)

export const createCategoryAsync = createAsyncThunk(
    'category/createCategory',
    async(formData)=>{
         const data= await createCategory(formData);  
         return data;
    }
)


export const deleteCategoryAsync = createAsyncThunk(
    'category/deleteCategory',
    async(id)=>{
         const data= await deleteCategory(id);  
         return data;
    }
)
 

const initialState= { 
    loading:false,
    success:false,
    message:null, 
    data:[],
  };

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder)=>{
    builder
    .addCase(fetchCategoryAsync.pending,(state)=>{
        state.loading=true;
        state.success=false; 
    })
    .addCase(fetchCategoryAsync.fulfilled,(state,actions)=>{
        state.loading=false;
        state.message=actions.payload.message  
        if(actions.payload.success){
            state.success=true;
            state.data= actions.payload.data  
        }else{
            state.success=false; 
        }
    })
    .addCase(fetchCategoryAsync.rejected,(state,actions)=>{
        state.loading=false;
        state.message=actions.error.message
        state.success=false; 
    })
    .addCase(createCategoryAsync.pending,(state)=>{
        state.loading=true;
        state.success=false; 
    })
    .addCase(createCategoryAsync.fulfilled,(state,actions)=>{
        state.loading=false;
        state.message=actions.payload.message 
        if(actions.payload.success){
            state.success=true; 
            state.data.push(actions.payload.data)
        }else{
            state.success=false; 
        }
    })
    .addCase(createCategoryAsync.rejected,(state,actions)=>{
        state.loading=false;
        state.message=actions.error.message
        state.success=false; 
    })
    .addCase(deleteCategoryAsync.pending,(state)=>{
        state.loading=true;
        state.success=false; 
    })
    .addCase(deleteCategoryAsync.fulfilled,(state,actions)=>{
        state.loading=false;
        state.message=actions.payload.message 
        if(actions.payload.success){
            state.success=true;  
            state.data=state.data.filter((p)=>p.id!==actions.payload.data.id) 
        }else{
            state.success=false; 
        }
    })
    .addCase(deleteCategoryAsync.rejected,(state,actions)=>{
        state.loading=false;
        state.message=actions.error.message
        state.success=false; 
    })

  }
})

// Action creators are generated for each case reducer function
export const data = (state)=>state.category.data; 
export const loading = (state)=>state.category.loading; 
export const message = (state)=>state.category.message; 
export const success = (state)=>state.category.success; 

export default categorySlice.reducer