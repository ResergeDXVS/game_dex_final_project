import userReducer, {  closeUser } from "../userSlice";
import { configureStore } from "@reduxjs/toolkit";

// describe("userSlice reducers", () => {
//     const initialState: UserState = {
//         users: [],
//         actualUser: null,
//         status: "idle",
//         error: null,
//     };

//     it("should return the initial state", () => {
//         expect(userReducer(undefined, { type: "unknown" })).toEqual(initialState);
//     });

//     it("should handle closeUser", () => {
//         const stateWithUser: UserState = {
//         ...initialState,
//         actualUser: { id: 1, name: "Sergio", paternal_surname: "Perez", maternal_surname: null, rfc: "XAAA010120004KT", datebirth: "2000-01-01", email: "mail@mail.com", password: "password" },
//         };
//         const state = userReducer(stateWithUser, closeUser());
//         expect(state.actualUser).toBeNull();
//     });

    // it("should handle loginUserThunk.pending", () => {
    //     const action = { type: loginUserThunk.pending.type };
    //     const state = userReducer(initialState, action);
    //     expect(state.status).toBe("loading");
    //     expect(state.error).toBeNull();
    // });

    // it("should handle loginUserThunk.fulfilled", () => {
    //     const user = { id: 1, name: "Sergio", paternal_surname: "Perez", maternal_surname: null, rfc: "XAAA010120004KT", datebirth: "2000-01-01", email: "mail@mail.com", password: "password" };
    //     const action = { type: loginUserThunk.fulfilled.type, payload: user };
    //     const state = userReducer(initialState, action);
    //     expect(state.status).toBe("succeeded");
    //     expect(state.actualUser).toEqual(user);
    // });

    // it("should handle loginUserThunk.rejected", () => {
    //     const action = { type: loginUserThunk.rejected.type, payload: "Usuario no encontrado" };
    //     const state = userReducer(initialState, action);
    //     expect(state.status).toBe("failed");
    //     expect(state.error).toBe("Usuario no encontrado");
    // });

    // it("should handle createUserThunk.fulfilled", () => {
    //     const user = { id: 1, name: "Sergio", paternal_surname: "Perez", maternal_surname: null, rfc: "XAAA010120004KT", datebirth: "2000-01-01", email: "mail@mail.com", password: "password" };
    //     const action = { type: createUserThunk.fulfilled.type, payload: user };
    //     const state = userReducer(initialState, action);
    //     expect(state.status).toBe("succeeded");
    //     expect(state.users).toContainEqual(user);
    //     expect(state.actualUser).toEqual(user);
    // });
// });


// describe("userSlice thunks", () => {
//     beforeEach(() => {
//         localStorage.clear();
//     });

    // it("loginUserThunk should reject if user not found", async () => {
    //     const store = configureStore({ reducer: { user: userReducer } });

    //     const result = await store.dispatch(loginUserThunk({ email: "no@mail.com", password: "1234" }));

    //     expect(result.type).toBe("users/loginUserThunk/rejected");
    //     expect(result.payload).toBe("Usuario no encontrado");
    //     expect(store.getState().user.status).toBe("failed");
    //     expect(store.getState().user.error).toBe("Usuario no encontrado");
    // });

    // it("loginUserThunk should fulfill if user exists", async () => {
    //     const existingUser = {
    //     id: 1,
    //     name: "Sergio",
    //     paternal_surname: "Perez",
    //     maternal_surname: null,
    //     rfc: "XAAA010120004KT",
    //     datebirth: "2000-01-01",
    //     email: "mail@mail.com",
    //     password: "password",
    //     };

    //     const store = configureStore({
    //     reducer: { user: userReducer },
    //     preloadedState: { user: { users: [existingUser], actualUser: null, status: "idle" as const, error: null } },
    //     });

    //     const result = await store.dispatch(loginUserThunk({ email: "mail@mail.com", password: "password" }));

    //     expect(result.type).toBe("users/loginUserThunk/fulfilled");
    //     expect(store.getState().user.status).toBe("succeeded");
    //     expect(store.getState().user.actualUser).toEqual(existingUser);
    //     expect(localStorage.getItem("actualUser")).toContain("mail@mail.com");
    // });

    // it("createUserThunk should reject if email already exists", async () => {
    //     const existingUser = {
    //     id: 1,
    //     name: "Sergio",
    //     paternal_surname: "Perez",
    //     maternal_surname: null,
    //     rfc: "XAAA010120004KT",
    //     datebirth: "2000-01-01",
    //     email: "mail@mail.com",
    //     password: "password",
    //     };

    //     const store = configureStore({
    //     reducer: { user: userReducer },
    //     preloadedState: { user: { users: [existingUser], actualUser: null, status: "idle" as const, error: null } },
    //     });

    //     const form = {
    //     name: "Nuevo",
    //     paternal_surname: "Apellido",
    //     maternal_surname: "Apellido",
    //     rfc: "RFC123",
    //     datebirth: "2000-01-01",
    //     email: "mail@mail.com", 
    //     password: "password",
    //     };

    //     const result = await store.dispatch(createUserThunk(form));

    //     expect(result.type).toBe("users/createUserThunk/rejected");
    //     expect(result.payload).toBe("El usuario ya existe");
    //     expect(store.getState().user.status).toBe("failed");
    //     expect(store.getState().user.error).toBe("El usuario ya existe");
    // });

    // it("createUserThunk should fulfill and add new user", async () => {
    //     const store = configureStore({ reducer: { user: userReducer } });

    //     const form = {
    //     name: "Sergio",
    //     paternal_surname: "Perez",
    //     maternal_surname: "Perez",
    //     rfc: "XAAA010120004KT",
    //     datebirth: "2000-01-01",
    //     email: "mail@mail.com",
    //     password: "password",
    //     };

    //     const result = await store.dispatch(createUserThunk(form));

    //     expect(result.type).toBe("users/createUserThunk/fulfilled");
    //     expect(store.getState().user.status).toBe("succeeded");
    //     expect(store.getState().user.users).toHaveLength(1);
    //     expect(store.getState().user.actualUser?.email).toBe("mail@mail.com");
    //     expect(localStorage.getItem("userList")).toContain("mail@mail.com");
    //     expect(localStorage.getItem("actualUser")).toContain("mail@mail.com");
    // });

//     it("closeUser should clear actualUser", () => {
//         const existingUser = {
//         id: 1,
//         name: "Sergio",
//         paternal_surname: "Perez",
//         maternal_surname: "Perez",
//         rfc: "XAAA010120004KT",
//         datebirth: "2000-01-01",
//         email: "mail@mail.com",
//         password: "password",
//         };

//         const store = configureStore({
//         reducer: { user: userReducer },
//         preloadedState: { user: { users: [existingUser], actualUser: existingUser, status: "idle" as const, error: null } },
//         });

//         store.dispatch(closeUser());

//         expect(store.getState().user.actualUser).toBeNull();
//         expect(localStorage.getItem("actualUser")).toContain("null");
//     });
// });