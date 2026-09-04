import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GET_COMPANY_LIST } from "../../constants/actionTypes";
import api from "../../api";
import { ASYNC_STATUS } from "../../constants/asyncState";

export const getCompanyList = createAsyncThunk(GET_COMPANY_LIST,async () => {
    const response = await api.get(`products/get-companies/`);
    return response.data;
});


const dataSlice = createSlice({
    name:"category",
    initialState:{
        companies:[],
        status:'idle',
        error: null as null|string,
    },
    reducers:{},
    extraReducers: builder => {
        builder
        //Detalles de Producto
        .addCase(getCompanyList.pending, (state) => {
            state.status=ASYNC_STATUS.PENDING;
        })
        .addCase(getCompanyList.fulfilled, (state, action) => {
            state.status=ASYNC_STATUS.FULFILLED;
            state.companies=action.payload;
        })
        .addCase(getCompanyList.rejected, (state, action) => {
            state.status=ASYNC_STATUS.REJECTED;
            state.error = action.error.message as string;
        })
    }
})

const { reducer: dataReducer} = dataSlice;
export default dataReducer;