import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        failing: false,
        user: null,
    },
    reducers: {
        isLoading: (state) => {
            state.failing = false;
            state.loading = true;
        },
        isFailing: (state) => {
            state.failing = true;
            state.loading = false;
        },
        isSuccess: (state) => {
            state.failing = false;
            state.loading = false;
        },
        isLogin: (state, action) => {
            state.failing = false;
            state.loading = false;
            state.user = action.payload;
        },
        isLogout: (state) => {
            state.failing = false;
            state.loading = false;
            state.user = null;
        },
    },
});

export const { isFailing, isSuccess, isLoading, isLogin, isLogout } =
    authSlice.actions;
export default authSlice.reducer;
