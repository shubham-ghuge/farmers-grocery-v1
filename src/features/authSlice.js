import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const API_URL = "https://farmers-grocery-v2.herokuapp.com";
export const registerUser = createAsyncThunk('auth/register', async (userDetails) => {
    const { data } = await axios.post(`${API_URL}/customers/register`, userDetails);
    return data;
});
export const loginUser = createAsyncThunk('auth/login', async (userDetails) => {
    console.log(userDetails);
    const { data } = await axios.post(`${API_URL}/customers/login`, userDetails);
    return data;
});

const initialState = {
    loading: false,
    userLoginStatus: false,
    message: null,
    user: null
}
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action) => {
            console.log("setting headers in reducer");
            axios.defaults.headers.common["Authorization"] = action.payload.token;
            state.userLoginStatus = true;
            state.user = action.payload.user;
        },
        logout: (state) => {
            localStorage.removeItem("login")
            state.userLoginStatus = false;
            state.user = null;
            axios.defaults.headers.common["Authorization"] = null;
        },
        setMessage: (state) => {
            state.message = null
        }
    },
    extraReducers: {
        [registerUser.pending]: (state) => {
            state.loading = true
        },
        [registerUser.fulfilled]: (state, action) => {
            state.message = action.payload.message;
            console.log(action.payload.message)
            state.loading = false;
        },
        [registerUser.rejected]: (state) => {
            state.message = "something went wrong, Try again later!";
            state.loading = false;
        },
        [loginUser.pending]: (state) => {
            state.loading = true
        },
        [loginUser.fulfilled]: (state, action) => {
            const { message, token, user, success } = action.payload;
            if (success) {
                localStorage.setItem("login", JSON.stringify({ isUserLoggedIn: true, token, user }))
                state.user = user;
                state.userLoginStatus = true;
                axios.defaults.headers.common["Authorization"] = token;
            }
            state.message = message;
            state.loading = false;
        },
        [loginUser.rejected]: (state) => {
            state.message = "This Didn't work,try signing in!";
            state.loading = false;
        },
    }
});

export const { setToken, logout, setMessage } = authSlice.actions;
export default authSlice.reducer;