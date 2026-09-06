// import addressReducer, {  AddressState } from "../addresssSlice";
// import { configureStore } from "@reduxjs/toolkit";

// describe("addressSlice", () => {
//     const initialState: AddressState = {
//         address: [],
//         status: "idle",
//         error: null,
//     };

//     it("should return the initial state", () => {
//         expect(addressReducer(undefined, { type: "unknown" })).toEqual(initialState);
//     });

//     it("should handle pending state", () => {
//         const action = { type: createAddressThunk.pending.type };
//         const state = addressReducer(initialState, action);
//         expect(state.status).toBe("loading");
//         expect(state.error).toBeNull();
//     });

//     it("should handle fulfilled state", () => {
//         const newAddress = {
//         id: 1,
//         user_id: 1,
//         address: "Calle Falsa",
//         internal_number: "76",
//         external_number: "1112",
//         postal: "12420",
//         suburb: "Texcoco",
//         country: "México",
//         };
//         const action = { type: createAddressThunk.fulfilled.type, payload: newAddress };
//         const state = addressReducer(initialState, action);
//         expect(state.status).toBe("succeeded");
//         expect(state.address).toContainEqual(newAddress);
//     });

//     it("should handle rejected state", () => {
//         const action = { type: createAddressThunk.rejected.type, payload: "Error de dirección" };
//         const state = addressReducer(initialState, action);
//         expect(state.status).toBe("failed");
//         expect(state.error).toBe("Error de dirección");
//     });
// });


// describe("createAddressThunk logic", () => {
//     it("should reject if no user is logged in", async () => {
//         const store = configureStore({
//         reducer: {
//             addresses: addressReducer,
//             user: () => ({ actualUser: null }),
//         },
//         });

//         const result = await store.dispatch(
//         createAddressThunk({
//             address: "Calle Falsa",
//             internal_number: "76",
//             external_number: "1112",
//             postal: "12420",
//             suburb: "Texcoco",
//             country: "México",
//         }) as any
//         );

//         expect(result.type).toBe("address/createAddressThunk/rejected");
//         expect(result.payload).toBe("No se ha iniciado sesión.");
//     });

//     it("should reject if address already exists", async () => {
//         const store = configureStore({
//         reducer: {
//             addresses: () => ({
//             address: [
//                 { id: 1, user_id: 1, address: "Calle Falsa", internal_number: "", external_number: "", postal: "", suburb: "", country: "" },
//             ],
//             status: "idle",
//             error: null,
//             }),
//             user: () => ({ actualUser: { id: 1, name: "Usuario" } }),
//         },
//         });

//         const result = await store.dispatch(
//         createAddressThunk({
//             address: "Calle Falsa",
//             internal_number: "76",
//             external_number: "1112",
//             postal: "12420",
//             suburb: "Texcoco",
//             country: "México",
//         }) as any
//         );

//         expect(result.type).toBe("address/createAddressThunk/rejected");
//         expect(result.payload).toBe("La dirección ya está registrada por el usuario");
//     });

//     it("should fulfill with a new address", async () => {
//         const store = configureStore({
//         reducer: {
//             addresses: addressReducer,
//             user: () => ({ actualUser: { id: 1, name: "Usuario" } }),
//         },
//         });

//         const result = await store.dispatch(
//         createAddressThunk({
//             address: "Nueva Calle",
//             internal_number: "76",
//             external_number: "1112",
//             postal: "12420",
//             suburb: "Texcoco",
//             country: "México",
//         }) as any
//         );

//         expect(result.type).toBe("address/createAddressThunk/fulfilled");
//         expect(result.payload.address).toBe("Nueva Calle");
//         expect(store.getState().addresses.address).toHaveLength(1);
//     });
// });
export {};