// import paymentReducer, { createPaymentThunk, PaymentState } from "../paymentMethodSlice";


// describe("paymentSlice reducers", () => {
//     const initialState: PaymentState = {
//         payment: [],
//         status: "idle",
//         error: null,
//     };

//     it("should return the initial state", () => {
//         expect(paymentReducer(undefined, { type: "unknown" })).toEqual(initialState);
//     });

//     it("should handle pending state", () => {
//         const action = { type: createPaymentThunk.pending.type };
//         const state = paymentReducer(initialState, action);
//         expect(state.status).toBe("loading");
//         expect(state.error).toBeNull();
//     });

//     it("should handle fulfilled state", () => {
//         const newPayment = {
//         id: 1,
//         user_id: 1,
//         card_number: "1234567890123456",
//         expiration: "12/30",
//         cvc: "123",
//         };
//         const action = { type: createPaymentThunk.fulfilled.type, payload: newPayment };
//         const state = paymentReducer(initialState, action);
//         expect(state.status).toBe("succeeded");
//         expect(state.payment).toContainEqual(newPayment);
//     });

//     it("should handle rejected state", () => {
//         const action = { type: createPaymentThunk.rejected.type, payload: "Error de tarjeta" };
//         const state = paymentReducer(initialState, action);
//         expect(state.status).toBe("failed");
//         expect(state.error).toBe("Error de tarjeta");
//   });
// });
export {};