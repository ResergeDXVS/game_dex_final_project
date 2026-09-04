import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GET_PRODUCT_DETAIL, GET_PRODUCT_LIST, GET_PRODUCT_LIST_CATEGORY, GET_PRODUCT_LIST_MAIN } from "../../constants/actionTypes";
import api from "../../api";
import { ASYNC_STATUS } from "../../constants/asyncState";

export const getProductDetail = createAsyncThunk(GET_PRODUCT_DETAIL,async (id:number) => {
    const response = await api.get(`products/get-product-detail/${id}/`);
    return response.data;
});

export const getProductListMain = createAsyncThunk(GET_PRODUCT_LIST_MAIN,async () => {
    const response = await api.get(`products/get-product-list-main/`);
    return response.data;
});

export const getProductList = createAsyncThunk(GET_PRODUCT_LIST,async () => {
    const response = await api.get(`products/get-product-list/`);
    return response.data;
});

export const getProductListCategory = createAsyncThunk(GET_PRODUCT_LIST_CATEGORY,async (category:string) => {
    const response = await api.get(`products/get-product-list-category/${category}/`);
    return response.data;
});



export type Products = {
    id: number,
    name: string,
    image_url: string,
    release_date: string,
    description: string,
    price: number,
    promotion: number,
    category_id: number,
    company_id: number,
    
}



const dataSlice = createSlice({
    name:"products",
    initialState:{
        list:[],
        detail:{} as Products,
        status:'idle',
        error: null as null|string,
    },
    reducers:{},
    extraReducers: builder => {
        builder
        .addCase(getProductDetail.pending, (state) => {
            state.status=ASYNC_STATUS.PENDING;
        })
        .addCase(getProductDetail.fulfilled, (state, action) => {
            state.status=ASYNC_STATUS.FULFILLED;
            state.detail=action.payload
        })
        .addCase(getProductDetail.rejected, (state, action) => {
            state.status=ASYNC_STATUS.REJECTED;
            state.error = action.error.message as string;
        })
        .addCase(getProductListMain.pending, (state) => {
            state.status=ASYNC_STATUS.PENDING;
        })
        .addCase(getProductListMain.fulfilled, (state, action) => {
            state.status=ASYNC_STATUS.FULFILLED;
            state.list=action.payload
        })
        .addCase(getProductListMain.rejected, (state, action) => {
            state.status=ASYNC_STATUS.REJECTED;
            state.error = action.error.message as string;
        })
        .addCase(getProductList.pending, (state) => {
            state.status=ASYNC_STATUS.PENDING;
        })
        .addCase(getProductList.fulfilled, (state, action) => {
            state.status=ASYNC_STATUS.FULFILLED;
            state.list=action.payload
        })
        .addCase(getProductList.rejected, (state, action) => {
            state.status=ASYNC_STATUS.REJECTED;
            state.error = action.error.message as string;
        })
        .addCase(getProductListCategory.pending, (state) => {
            state.status=ASYNC_STATUS.PENDING;
        })
        .addCase(getProductListCategory.fulfilled, (state, action) => {
            state.status=ASYNC_STATUS.FULFILLED;
            state.list=action.payload
        })
        .addCase(getProductListCategory.rejected, (state, action) => {
            state.status=ASYNC_STATUS.REJECTED;
            state.error = action.error.message as string;
        })
    }
});


const { reducer: productsReducer } = dataSlice;
export default productsReducer;

