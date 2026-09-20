import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import userReducer from "../slices/userSlice";
import productsReducer from "../slices/productSlice";
import dataReducer from "../slices/dataSlice";
import cartReducer from "../slices/cartSlice";
import paymentReducer from "../slices/paymentMethodSlice";
import addressReducer from "../slices/addresssSlice";
import billingReducer from "../slices/billingSlice";




export const store = configureStore({
    reducer:{
        user:userReducer,
        cart:cartReducer,
        product:productsReducer,
        data:dataReducer,
        payments:paymentReducer,
        addresses:addressReducer,
        billings:billingReducer,
    }
});




export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;