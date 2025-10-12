import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; 
import { getUser, signOut } from "./sideBarApi";


export const getUserAsync = createAsyncThunk(
    'auth/getUser',
    async () => {
        const data = await getUser();
        return data;
    }
)

export const signOutAsync = createAsyncThunk(
    'auth/signOut',
    async () => {
        const data = await signOut();
        return data;
    }
)

 
const initialState = {
    loading: false,
    success: false,
    message: null,
    user:""
};


export const sideBarSlice = createSlice({
    name: "sideBar",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUserAsync.pending, (state) => {
                state.loading = true,
                state.success = false
            })
            .addCase(getUserAsync.fulfilled, (state, actions) => {
                state.loading = false,
                state.success = true,
                state.message = actions.payload.message
                state.user=actions.payload.data
            })
            .addCase(getUserAsync.rejected, (state, actions) => {
                state.loading = false,
                state.success = false,
                state.message = actions.error.message
            })
            .addCase(signOutAsync.pending, (state) => {
                state.loading = true,
                state.success = false
            })
            .addCase(signOutAsync.fulfilled, (state, actions) => {
                state.loading = false,
                state.success = true,
                state.message = actions.payload.message
                state.user=""
            })
            .addCase(signOutAsync.rejected, (state, actions) => {
                state.loading = false,
                state.success = false,
                state.message = actions.error.message
            })
           
    }
})

export const loading = (state) => state.sideBar.loading
export const message = (state) => state.sideBar.message
export const success = (state) => state.sideBar.success
export const user = (state) => state.sideBar.user 

export default sideBarSlice.reducer