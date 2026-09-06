import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import { ThemeProvider } from "styled-components";
import { MemoryRouter } from "react-router-dom";
import UserLogin from ".";
import Theme from "../../../theme";
//import { loginUserThunk } from "../../../redux/slices/userSlice";

const mockDispatch = jest.fn();
const mockNavigate = jest.fn();

jest.mock("../../../redux/store/store", () => ({
  useAppDispatch: () => mockDispatch,
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("UserLogin component", () => {
    const renderWithProviders = () =>
        render(
        <ThemeProvider theme={Theme}>
            <MemoryRouter>
            <UserLogin />
            </MemoryRouter>
        </ThemeProvider>
        );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render the login form inputs", () => {
        renderWithProviders();
        expect(screen.getByLabelText(/Correo Electrónico/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
    });

    it("should show validation feedback when submitting empty form", () => {
        renderWithProviders();
        const submit = screen.getByRole("button", { name: /Ingresar/i });
        fireEvent.click(submit);

        expect(screen.getByText(/Ingresa un correo válido/i)).toBeVisible();
        expect(screen.getByText(/Ingresa una contraseña minimo/i)).toBeVisible();
    });

    // it("should login successfully and navigate home", async () => {
    //     mockDispatch.mockResolvedValueOnce({ type: loginUserThunk.fulfilled.type });

    //     renderWithProviders();

    //     fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), {
    //     target: { value: "mail@mail.com" },
    //     });
    //     fireEvent.change(screen.getByLabelText(/Contraseña/i), {
    //     target: { value: "password123" },
    //     });

    //     const submit = screen.getByRole("button", { name: /Ingresar/i });
    //     fireEvent.click(submit);

    //     await waitFor(() => {
    //     expect(mockDispatch).toHaveBeenCalledTimes(1);
    //     expect(mockNavigate).toHaveBeenCalledWith("/");
    //     });
    // });

    // it("should show alert when login fails", async () => {
    //     mockDispatch.mockResolvedValueOnce({ type: loginUserThunk.rejected.type });

    //     renderWithProviders();

    //     fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), {
    //     target: { value: "mail@mail.com" },
    //     });
    //     fireEvent.change(screen.getByLabelText(/Contraseña/i), {
    //     target: { value: "password123" },
    //     });

    //     const submit = screen.getByRole("button", { name: /Ingresar/i });
    //     fireEvent.click(submit);

    //     const alert = await screen.findByText(/Cuenta o contraseña incorrecta/i);
    //     expect(alert).toBeVisible();
    // });
});