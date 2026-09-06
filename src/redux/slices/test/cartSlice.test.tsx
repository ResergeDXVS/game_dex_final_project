import cartReducer, {
  addCart,
  updateCart,
  deleteItemCart,
  clearCart,
  addMethod,
  addAddress,
} from "../cartSlice";
//import { createUserThunk } from "../userSlice";

const mockUser = { id: 1, name: "Usuario" } as any;
const mockProduct = {
  id: 10,
  name: "Producto",
  price: 100,
  promotion: 10,
} as any;

describe("cartSlice reducers", () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it("should handle addCart for new product", () => {
        const initialState = { carts: [{ user_id: 1, product_ids: [], total: 0, payment_id: null, address_id: null }] };
        const action = addCart({ product: mockProduct });
        const state = cartReducer(initialState, action);

        expect(state.carts[0].product_ids).toHaveLength(1);
        expect(state.carts[0].total).toBeCloseTo(90); // 100 - 10% = 90
    });

    it("should updateCart count and total", () => {
        const initialState = {
        carts: [
            {
            user_id: 1,
            product_ids: [{ product: mockProduct, count: 1 }],
            total: 90,
            payment_id: null,
            address_id: null,
            },
        ],
        };
        const action = updateCart({ id:1, countItem: 3 });
        const state = cartReducer(initialState, action);

        expect(state.carts[0].product_ids[0].count).toBe(3);
        expect(state.carts[0].total).toBeCloseTo(270);
    });

    it("should deleteItemCart and update total", () => {
        const initialState = {
        carts: [
            {
            user_id: 1,
            product_ids: [{ product: mockProduct, count: 2 }],
            total: 180,
            payment_id: null,
            address_id: null,
            },
        ],
        };
        const action = deleteItemCart({ id: 10 });
        const state = cartReducer(initialState, action);

        expect(state.carts[0].product_ids).toHaveLength(0);
        expect(state.carts[0].total).toBe(0);
    });

    it("should clearCart", () => {
        const initialState = {
        carts: [
            {
            user_id: 1,
            product_ids: [{ product: mockProduct, count: 2 }],
            total: 180,
            payment_id: 2,
            address_id: 3,
            },
        ],
        };
        const action = clearCart(mockUser);
        const state = cartReducer(initialState, action);

        expect(state.carts[0].product_ids).toHaveLength(0);
        expect(state.carts[0].total).toBe(0);
        expect(state.carts[0].payment_id).toBeNull();
        expect(state.carts[0].address_id).toBeNull();
    });

    it("should addMethod", () => {
        const initialState = { carts: [{ user_id: 1, product_ids: [], total: 0, payment_id: null, address_id: null }] };
        const action = addMethod({ payment_id: 99 });
        const state = cartReducer(initialState, action);

        expect(state.carts[0].payment_id).toBe(99);
    });

    it("should addAddress", () => {
        const initialState = { carts: [{ user_id: 1, product_ids: [], total: 0, payment_id: null, address_id: null }] };
        const action = addAddress({ address_id: 55 });
        const state = cartReducer(initialState, action);

        expect(state.carts[0].address_id).toBe(55);
    });

    // it("should handle createUserThunk.fulfilled", () => {
    //     const initialState = { carts: [] };
    //     const action = { type: createUserThunk.fulfilled.type, payload: { id: 2 } };
    //     const state = cartReducer(initialState, action);

    //     expect(state.carts).toHaveLength(1);
    //     expect(state.carts[0].user_id).toBe(2);
    //     expect(state.carts[0].total).toBe(0);
    // });
});