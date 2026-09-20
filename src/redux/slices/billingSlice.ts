import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GET_BILLING, POST_BILLING } from "../../constants/actionTypes";
import api from "../../api";
import { ASYNC_STATUS } from "../../constants/asyncState";
import { User } from "../slices/userSlice";
import { AddressItem, PaymentItem } from "../../components/Cart/PaymentMethod";

// Tipos
export type OrderItem = {
    id: number;
    product_id: number;
    count: number;
    total: number;
};

export type BillingItem = {
    id: number;
    account_id: number;
    address_id: number;
    payment_id: number;
    total: number;
    orders: any[];
    address: AddressItem,
    payment: PaymentItem
};

// GET Billing
export const GetBilling = createAsyncThunk(
    GET_BILLING,
    async (token: string) => {
        const response = await api.get(`billings/billing/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        const data = response.data;
        return Array.isArray(data) ? data : [data];
    }
);

// POST Billing
export const PostBilling = createAsyncThunk(
    POST_BILLING,
    async (billing: Omit<BillingItem, "id">) => {
        const storedUser = localStorage.getItem("actualUser");
        const parsedUser = storedUser ? JSON.parse(storedUser) : null;

        if (!parsedUser) {
            throw new Error("No se ha iniciado sesión.");
        }

        const token = parsedUser.access;

        const response = await api.post(
        `billings/billing/`,
        {
            account_id: parsedUser.user.id,
            address_id: billing.address_id,
            payment_id: billing.payment_id,
            total: Number(billing.total.toFixed(2)),
            orders: billing.orders.map((o) => ({
                product: o.product_id,
                count: o.count,
                total: Number(o.total.toFixed(2)),
            })),
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


// Slice
const billingSlice = createSlice({
    name: "billing",
    initialState: {
        billings: [] as BillingItem[],
        status: "idle",
        error: null as null | string,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        // GET
        .addCase(GetBilling.pending, (state) => {
            state.status = ASYNC_STATUS.PENDING;
        })
        .addCase(GetBilling.fulfilled, (state, action) => {
            state.status = ASYNC_STATUS.FULFILLED;
            state.billings = action.payload;
        })
        .addCase(GetBilling.rejected, (state, action) => {
            state.status = ASYNC_STATUS.REJECTED;
            state.error = action.error.message ?? "Error al obtener billing";
        })

        // POST
        .addCase(PostBilling.pending, (state) => {
            state.status = ASYNC_STATUS.PENDING;
        })
        .addCase(PostBilling.fulfilled, (state, action) => {
            state.status = ASYNC_STATUS.FULFILLED;
            // Añadir el nuevo billing al array
            state.billings.push(action.payload);
        })
        .addCase(PostBilling.rejected, (state, action) => {
            state.status = ASYNC_STATUS.REJECTED;
            state.error = action.error.message ?? "Error al crear billing";
        });
    },
});

export const { reducer: billingReducer } = billingSlice;
export default billingReducer;
