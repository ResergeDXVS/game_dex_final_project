import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Products } from "./productSlice";

export const storageCarts = "storageCarts";

export type Items = {
    product: Products;
    count: number;
};

export type Cart = {
    product_ids: Items[];
    total: number;
    payment_id: number | null;
    address_id: number | null;
};

export interface CartStates {
  carts: Cart[];
}

const initialState: CartStates = {
  carts: localStorage.getItem(storageCarts)
    ? JSON.parse(localStorage.getItem(storageCarts) as string)
    : [
            {
                product_ids: [],
                total: 0,
                payment_id: null,
                address_id: null,
            },
      ],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addCart: (state, action: PayloadAction<{ product: Products }>) => {
            const cart = state.carts[0];
            const item = cart.product_ids.find(
                (i: Items) => i.product.id === action.payload.product.id
            );
            if (item) {
                item.count++;
            } else {
                cart.product_ids.push({ product: action.payload.product, count: 1 });
            }
            cart.total = cart.product_ids.reduce((acc, item) => {
                const priceWithPromo =
                item.product.price * (1 - item.product.promotion / 100);
                return acc + item.count * priceWithPromo;
            }, 0);
            cart.total = Number(cart.total.toFixed(2));
            localStorage.setItem(storageCarts, JSON.stringify(state.carts));
        },

        updateCart: (state,action: PayloadAction<{ id: number; countItem: number }>) => {
            const cart = state.carts[0];
            const item = cart.product_ids.find(
                (i: Items) => i.product.id === action.payload.id
            );
            if (item) {
                item.count = action.payload.countItem;
            }
            cart.total = cart.product_ids.reduce((acc, item) => {
                const priceWithPromo =
                item.product.price * (1 - item.product.promotion / 100);
                return acc + item.count * priceWithPromo;
            }, 0);
            cart.total = Number(cart.total.toFixed(2));
            localStorage.setItem(storageCarts, JSON.stringify(state.carts));
        },

        deleteItemCart: (state, action: PayloadAction<{ id: number }>) => {
            const cart = state.carts[0];
            cart.product_ids = cart.product_ids.filter(
                (item) => item.product.id !== action.payload.id
            );
            cart.total = cart.product_ids.reduce((acc, item) => {
                const priceWithPromo =
                item.product.price * (1 - item.product.promotion / 100);
                return acc + item.count * priceWithPromo;
            }, 0);
            cart.total = Number(cart.total.toFixed(2));
            localStorage.setItem(storageCarts, JSON.stringify(state.carts));
        },

        clearCart: (state) => {
            const cart = state.carts[0];
            cart.product_ids = [];
            cart.total = 0;
            cart.payment_id = null;
            cart.address_id = null;
            localStorage.setItem(storageCarts, JSON.stringify(state.carts));
        },

        addMethod: (state, action: PayloadAction<{ payment_id: number }>) => {
            const cart = state.carts[0];
            cart.payment_id = action.payload.payment_id;
            localStorage.setItem(storageCarts, JSON.stringify(state.carts));
        },

        addAddress: (state, action: PayloadAction<{ address_id: number }>) => {
            const cart = state.carts[0];
            cart.address_id = action.payload.address_id;
            localStorage.setItem(storageCarts, JSON.stringify(state.carts));
        },
    },
});

export const {
    addCart,
    updateCart,
    deleteItemCart,
    clearCart,
    addMethod,
    addAddress,
} = cartSlice.actions;

export default cartSlice.reducer;
