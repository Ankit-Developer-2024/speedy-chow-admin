import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createProduct, fetchCategory, fetchProduct } from './homeApi'

export const fetchProductAsync = createAsyncThunk(
    'home/fetchProduct',
    async()=>{
         const data= await fetchProduct();  
         return data;
    }
)

export const createProductAsync = createAsyncThunk(
    'home/createProduct',
    async(formData)=>{
         const data= await createProduct(formData);  
         return data;
    }
)

export const fetchCategoryAsync = createAsyncThunk(
    'home/fetchCategory',
    async()=>{
         const data= await fetchCategory();  
         return data;
    }
)


const initialState= { 
    loading:false,
    success:false,
    message:null,
    data:[],
    category:[],
  };

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder)=>{
    builder.addCase(fetchProductAsync.pending,(state)=>{
        state.loading=true;
        state.success=false; 
    })
    .addCase(fetchProductAsync.fulfilled,(state,actions)=>{
        state.loading=false;
        state.message=actions.payload.message 
        if(actions.payload.success){
            state.success=true;
            state.data= actions.payload.data  
        }else{
            state.success=false;
            state.data=[]
        }
    })
    .addCase(fetchProductAsync.rejected,(state,actions)=>{
        state.loading=false;
        state.message=actions.error.message
        state.success=false;
        state.data=[]
    })
    .addCase(fetchCategoryAsync.pending,(state)=>{
        state.loading=true;
        state.success=false; 
    })
    .addCase(fetchCategoryAsync.fulfilled,(state,actions)=>{
        state.loading=false;
        state.message=actions.payload.message 
        if(actions.payload.success){
            state.success=true;
            state.category= actions.payload.data  
        }else{
            state.success=false;
            state.category=[]
        }
    })
    .addCase(fetchCategoryAsync.rejected,(state,actions)=>{
        state.loading=false;
        state.message=actions.error.message
        state.success=false;
        state.category=[]
    })
     .addCase(createProductAsync.pending,(state)=>{
        state.loading=true;
        state.success=false; 
    })
    .addCase(createProductAsync.fulfilled,(state,actions)=>{
        state.loading=false;
        state.message=actions.payload.message 
        if(actions.payload.success){
            state.success=true;
             
        }else{
            state.success=false; 
        }
    })
    .addCase(createProductAsync.rejected,(state,actions)=>{
        state.loading=false;
        state.message=actions.error.message
        state.success=false; 
    })
  }
})

// Action creators are generated for each case reducer function
export const data = (state)=>state.home.data; 
export const loading = (state)=>state.home.loading; 
export const selectMessage = (state)=>state.home.message; 
export const category = (state)=>state.home.category; 

export default homeSlice.reducer