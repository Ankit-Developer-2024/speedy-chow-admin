import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { check, logIn, signUp } from "./authApi";


export const signUpAsync = createAsyncThunk(
    'auth/signup',
    async (args) => {
        const data = await signUp(args);
        return data;
    }
)

export const logInAsync = createAsyncThunk(
    'auth/login',
    async (args) => {
        const data = await logIn(args);
        return data;
    }
)

export const checkAsync = createAsyncThunk(
    'auth/check',
    async () => {
        const data = await check();
        return data;
    }
)

const initialState = {
    loading: false,
    success: false,
    message: null,
    userLogedIn: false,
    userChecked: false
};


export const authSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(signUpAsync.pending, (state) => {
            state.loading = true,
                state.success = false
        })
            .addCase(signUpAsync.fulfilled, (state, actions) => {
                state.loading = false,
                    state.success = true,
                    state.message = actions.payload.message
            })
            .addCase(signUpAsync.rejected, (state, actions) => {
                state.loading = false,
                    state.success = false,
                    state.message = actions.error.message
            })
            .addCase(logInAsync.pending, (state) => {
                state.loading = true,
                    state.success = false
                state.userLogedIn = false
            })
            .addCase(logInAsync.fulfilled, (state, actions) => {
                state.loading = false,
                    state.success = true,
                    state.message = actions.payload.message,
                    state.userLogedIn = true
            })
            .addCase(logInAsync.rejected, (state, actions) => {
                state.loading = false,
                    state.success = false,
                    state.message = actions.error.message,
                    state.userLogedIn = false
            })
            .addCase(checkAsync.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.userChecked = false;
                state.userLogedIn = false;
            })
            .addCase(checkAsync.fulfilled, (state, actions) => {
                state.loading = false;
                state.message = actions.payload.message;
                state.success = true
                if (actions.payload.success) {

                    state.userChecked = true;
                    state.userLogedIn = true;
                } else {

                    state.userChecked = false
                }

            })
            .addCase(checkAsync.rejected, (state, actions) => {
                state.loading = false,
                    state.success = false,
                    state.message = actions.error.message,
                    state.userChecked = false
            })
    }
})

export const loading = (state) => state.auth.loading
export const message = (state) => state.auth.message
export const success = (state) => state.auth.success
export const userLogedIn = (state) => state.auth.userLogedIn
export const userChecked = (state) => state.auth.userChecked

export default authSlice.reducer