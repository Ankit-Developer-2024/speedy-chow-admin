import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createProduct, deleteProduct, fetchCategory, fetchProduct, searchProduct, updateProduct } from './homeApi'

export const fetchProductAsync = createAsyncThunk(
    'home/fetchProduct',
    async(args)=>{
         const data= await fetchProduct(args);  
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

export const updateProductAsync = createAsyncThunk(
    'home/updateProduct',
    async(args,thunkAPI)=>{ 
        try {
            const data = await updateProduct(args.formData,args.id);  
            return data;
        } catch (error) {
           return thunkAPI.rejectWithValue(error.message);
        }
        
    }
)

export const deleteProductAsync = createAsyncThunk(
    'home/deleteProduct',
    async(id)=>{
         const data= await deleteProduct(id);  
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

export const searchProductAsync = createAsyncThunk(
    'home/searchProduct',
    async(args)=>{
         const data= await searchProduct(args);  
         return data;
    }
)


const initialState= { 
    loading:false,
    success:false,
    message:null,
    data:[],
    searchData:[],
    searchLoading:false,
    category:[],
  };

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder)=>{
    builder.addCase(fetchProductAsync.pending,(state)=>{
        state.loading=true;
        state.searchData=[]
        state.success=false; 
    })
    .addCase(fetchProductAsync.fulfilled,(state,actions)=>{
        state.loading=false; 
        state.message=actions.payload.message 
        state.success=actions.payload.success; 
        state.data= actions.payload.data  
    })
    .addCase(fetchProductAsync.rejected,(state,actions)=>{
        state.loading=false;
        state.message=actions.error.message
        state.success=false; 
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
        }
    })
    .addCase(fetchCategoryAsync.rejected,(state,actions)=>{
        state.loading=false;
        state.message=actions.error.message
        state.success=false; 
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
    .addCase(deleteProductAsync.pending,(state)=>{
        state.loading=true;
        state.success=false; 
    })
    .addCase(deleteProductAsync.fulfilled,(state,actions)=>{
        state.loading=false;
        state.message=actions.payload.message 
        if(actions.payload.success){
            state.success=true;  
            state.data=state.data.filter((p)=>p.id!==actions.payload.data.id) 
        }else{
            state.success=false; 
        }
    })
    .addCase(deleteProductAsync.rejected,(state,actions)=>{
        state.loading=false;
        state.message=actions.error.message
        state.success=false; 
    })
    .addCase(updateProductAsync.pending,(state)=>{ 
        state.loading=true;
        state.success=false; 
    })
    .addCase(updateProductAsync.fulfilled,(state,actions)=>{
        state.loading=false;
        state.message=actions.payload.message 
        state.success=actions.payload.success; 
    })
    .addCase(updateProductAsync.rejected,(state,actions)=>{
        state.loading=false;
        state.message=actions.error.message
        state.success=false; 
    })
     .addCase(searchProductAsync.pending,(state)=>{ 
        state.searchLoading=true;
        state.success=false; 
    })
    .addCase(searchProductAsync.fulfilled,(state,actions)=>{
        state.searchLoading=false;
        state.message=actions.payload.message 
        state.success=actions.payload.success; 
        state.searchData=actions.payload.data
    })
    .addCase(searchProductAsync.rejected,(state,actions)=>{
        state.searchLoading=false;
        state.message=actions.error.message
        state.success=false; 
    })

  }
})

// Action creators are generated for each case reducer function
export const data = (state)=>state.home.data; 
export const loading = (state)=>state.home.loading; 
export const message = (state)=>state.home.message; 
export const category = (state)=>state.home.category; 
export const searchData = (state)=>state.home.searchData; 
export const searchLoading = (state)=>state.home.searchLoading; 

export default homeSlice.reducer