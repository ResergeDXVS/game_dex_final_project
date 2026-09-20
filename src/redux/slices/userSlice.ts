import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LOGIN_USER, POST_USER } from "../../constants/actionTypes";
import api from "../../api";
import { ASYNC_STATUS } from "../../constants/asyncState";

export const loginUserText = "actualUser";
export const usersInfo = "userList";

type LoginInfo = {
    email: string,
    password:string
}
type UserInfo = {
    name: string,
    paternal_surname: string,
    maternal_surname:string,
    rfc:string,
    datebirth:string,
    email:string,
    password:string
}

export type User = {
    id: number;
    name: string;
    paternal_surname: string;
    maternal_surname: string | null;
    rfc: string;
    datebirth: string;
    email: string;
    password: string;
};

export const loginUser = createAsyncThunk(LOGIN_USER,async(login:LoginInfo)=> {
    const response = await api.post(`accounts/login/`,{
        email: login.email,
        password: login.password,
    });
    return response.data;
});

export const postUser = createAsyncThunk(POST_USER,async (user:UserInfo) => {
    const response = await api.post(`accounts/user/`,{
        name: user.name.toUpperCase(),
        paternal_surname: user.paternal_surname.toUpperCase(),
        maternal_surname:user.maternal_surname.toUpperCase(),
        rfc:user.rfc.toUpperCase(),
        datebirth:user.datebirth,
        email:user.email,
        password:user.password,
    });
    return response.data;
});


const userSlice = createSlice({
    name: "users",
    initialState:{
        actualUser: localStorage.getItem(loginUserText)
            ? JSON.parse(localStorage.getItem(loginUserText) as string)
            : null,
        status:'idle',
        error:null as null|string,
    },
    reducers: {
        closeUser: state => {
            localStorage.setItem(loginUserText, JSON.stringify(null));
            state.actualUser = null;
        },
    },
    extraReducers: builder => {
        builder
        .addCase(loginUser.pending, state => {
            state.status = ASYNC_STATUS.PENDING;
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.status = ASYNC_STATUS.FULFILLED;
            localStorage.setItem(loginUserText, JSON.stringify(action.payload));
            state.actualUser = action.payload;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.status = ASYNC_STATUS.REJECTED;
            state.error = action.error.message as string;
        })
        .addCase(postUser.pending, state => {
            state.status = ASYNC_STATUS.PENDING;
            state.error = null;
        })
        .addCase(postUser.fulfilled, (state, action) => {
            state.status = ASYNC_STATUS.FULFILLED;
            localStorage.setItem(loginUserText, JSON.stringify(action.payload));
            state.actualUser = action.payload;
        })
        .addCase(postUser.rejected, (state, action) => {
            state.status = ASYNC_STATUS.REJECTED;
            state.error = action.error.message as string;
        });
    },
});

export const { closeUser } = userSlice.actions;
export default userSlice.reducer;