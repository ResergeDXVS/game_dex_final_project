import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FormMethodState } from "../../components/Cart/PaymentMethod";
import { User } from "./userSlice";
import { GET_CARDS, POST_CARDS } from "../../constants/actionTypes";
import api from "../../api";
import { ASYNC_STATUS } from "../../constants/asyncState";


export type PaymentMethod = {
    user_id: number,
    id: number,
    card_number: string,
    expiration: string,
    cvc: string,
};

export interface PaymentState {
    payment: PaymentMethod[],
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}


export const GetPaymentMethod = createAsyncThunk(
    GET_CARDS,
    async (token: string) => {
        const response = await api.get(`accounts/card/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = response.data;
        return Array.isArray(data) ? data : [data];
    }
);


export const PostPaymentMethod = createAsyncThunk(
    POST_CARDS,
    async (card:PaymentMethod) => {
        const storedUser = localStorage.getItem("actualUser");
        const parsedUser = storedUser
            ? (JSON.parse(storedUser) as User & { access?: string })
            : null;

        if (!parsedUser) {
            throw new Error("No se ha iniciado sesión.");
        }

        const token = parsedUser.access;
        const response = await api.post(`accounts/card/`, 
            {
                account_id: parsedUser.id,
                card_number: card.card_number,
                expiration:card.expiration,
                cvc:card.cvc,
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


const paymentMethodSlice = createSlice({
    name: "paymentMethod",
    initialState:{
        payment: [] as PaymentItem[],
        status: "idle",
        error:null as null|string,
    },
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(GetPaymentMethod.pending, state => {
            state.status = ASYNC_STATUS.PENDING;
            state.error = null;
        })
        .addCase(GetPaymentMethod.fulfilled, (state, action) => {
            state.status = ASYNC_STATUS.FULFILLED;
            state.payment = action.payload;
        })
        .addCase(GetPaymentMethod.rejected, (state, action) => {
            state.status = ASYNC_STATUS.PENDING;
            state.error = action.error as string;
        })
        .addCase(PostPaymentMethod.pending, state => {
            state.status = ASYNC_STATUS.PENDING;
            state.error = null;
        })
        .addCase(PostPaymentMethod.fulfilled, (state, action) => {
            state.status = ASYNC_STATUS.FULFILLED;
            state.payment.push(action.payload);
        })
        .addCase(PostPaymentMethod.rejected, (state, action) => {
            state.status = ASYNC_STATUS.PENDING;
            state.error = action.error as string;
        })
    },
    
});

;
const { reducer: paymentReducer } = paymentMethodSlice;
export default paymentReducer;