import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddressItem, AddressMethodState } from "../../components/Cart/PaymentMethod";
import { User } from "./userSlice";
import { GET_ADDRESSES, POST_ADDRESSES } from "../../constants/actionTypes";
import api from "../../api";
import { ASYNC_STATUS } from "../../constants/asyncState";


export type address = {
    user_id: number,
    id: number,
    address:string,
    internal_number:string,
    external_number:string,
    postal:string,
    suburb:string,
    country:string,

};

export interface AddressState {
    address: address[],
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

export const GetAddresses = createAsyncThunk(
    GET_ADDRESSES,
    async (token: string) => {
        const response = await api.get(`accounts/address/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = response.data;
        return Array.isArray(data) ? data : [data];
    }
);


export const PostAddresses = createAsyncThunk(
    POST_ADDRESSES,
    async (address:address) => {
        const storedUser = localStorage.getItem("actualUser");
        const parsedUser = storedUser
            ? (JSON.parse(storedUser) as User & { access?: string })
            : null;

        if (!parsedUser) {
            throw new Error("No se ha iniciado sesión.");
        }

        const token = parsedUser.access;
        const response = await api.post(`accounts/address/`, 
            {
                account_id: parsedUser.id,
                address:address.address,
                internal_number:address.internal_number,
                external_number:address.external_number,
                postal:address.postal,
                suburb:address.suburb,
                country:address.country,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    }
);


const addressSlice = createSlice({
    name: "address",
    initialState:{
        address: [] as AddressItem[],
        status: "idle",
        error:null as null|string,
    },
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(GetAddresses.pending, state => {
            state.status = ASYNC_STATUS.PENDING;
            state.error = null;
        })
        .addCase(GetAddresses.fulfilled, (state, action) => {
            state.status = ASYNC_STATUS.FULFILLED;
            state.address = action.payload;
        })
        .addCase(GetAddresses.rejected, (state, action) => {
            state.status = ASYNC_STATUS.PENDING;
            state.error = action.error as string;
        })
        .addCase(PostAddresses.pending, state => {
            state.status = ASYNC_STATUS.PENDING;
            state.error = null;
        })
        .addCase(PostAddresses.fulfilled, (state, action) => {
            state.status = ASYNC_STATUS.FULFILLED;
            state.address.push(action.payload);
        })
        .addCase(PostAddresses.rejected, (state, action) => {
            state.status = ASYNC_STATUS.PENDING;
            state.error = action.error as string;
        })
    },
    
});

;
const { reducer: addressReducer } = addressSlice;
export default addressReducer;