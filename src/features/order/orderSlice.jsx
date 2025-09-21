import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; 
import { deleteMultipleOrder, deleteOrder, fetchAllOrder, updateOrder } from "./orderApi";


export const fetchAllOrderAsync = createAsyncThunk(
    'order/fetchAllOrder',
    async(args)=>{
        const data = await fetchAllOrder(args);
        return data;
    }

)

export const updateOrderAsync = createAsyncThunk(
    'order/updateOrder',
    async(args)=>{
        const data = await updateOrder(args);
        return data;
    }
)

export const  deleteOrderAsync = createAsyncThunk(
    'order/deleteOrder',
    async(id)=>{
        const data = await deleteOrder(id);
        return data;
    }
)

export const  deleteMultipleOrderAsync = createAsyncThunk(
    'order/deleteMultipleOrder',
    async(args)=>{
        const data = await deleteMultipleOrder(args);
        return data;
    }
)

const initialState= { 
    loading:false,
    success:false,
    message:null,
    data:[]
  };

export const orderSlice = createSlice({
    name:'order',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAllOrderAsync.pending,(state)=>{
            state.loading=true, 
            state.success=false
        })
        .addCase(fetchAllOrderAsync.fulfilled,(state,actions)=>{
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
        .addCase(fetchAllOrderAsync.rejected,(state,actions)=>{
                state.loading=false;
                state.message=actions.error.message
                state.success=false;
                state.data=[]
        })
        .addCase(deleteOrderAsync.pending,(state)=>{
            state.loading=true, 
            state.success=false
        })
        .addCase(deleteOrderAsync.fulfilled,(state,actions)=>{
            state.loading=false;
            state.message=actions.payload.message
           state.success=actions.payload.success; 
           if(state.success){
            state.data=state.data.filter((order)=>order.id!==actions.payload.data.id) 
           }
        })
        .addCase(deleteOrderAsync.rejected,(state,actions)=>{
                state.loading=false;
                state.message=actions.error.message
                state.success=false; 
        })
        .addCase(updateOrderAsync.pending,(state)=>{
            state.loading=true, 
            state.success=false
        })
        .addCase(updateOrderAsync.fulfilled,(state,actions)=>{
            state.loading=false;
            state.message=actions.payload.message
           state.success=actions.payload.success; 
           if(state.success){
            let index=state.data.findIndex((order)=>order.id===actions.payload.data.id) 
            state.data.splice(index,1,actions.payload.data) 
           }
        })
        .addCase(updateOrderAsync.rejected,(state,actions)=>{
                state.loading=false;
                state.message=actions.error.message
                state.success=false; 
        })
        .addCase(deleteMultipleOrderAsync.pending,(state)=>{
            state.loading=true, 
            state.success=false
        })
        .addCase(deleteMultipleOrderAsync.fulfilled,(state,actions)=>{
            state.loading=false;
            state.message=actions.payload.message
            state.success=actions.payload.success;  
            const deletedOrderIds = new Set(actions.payload.data.orders.map(order => order.id));
            state.data=state.data.filter((order)=>!deletedOrderIds.has(order.id))
        })
        .addCase(deleteMultipleOrderAsync.rejected,(state,actions)=>{
                state.loading=false;
                state.message=actions.error.message
                state.success=false; 
        })
    }

})

export const loading = (state) => state.order.loading
export const success = (state) => state.order.success
export const message = (state) => state.order.message
export const data = (state) => state.order.data

export default orderSlice.reducer