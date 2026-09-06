import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import { ThemeProvider } from "styled-components";
import { MemoryRouter } from "react-router-dom";
import UserCreate from ".";
import Theme from "../../../theme";
// import { createUserThunk } from "../../../redux/slices/userSlice";

const mockDispatch = jest.fn();
const mockNavigate = jest.fn();

jest.mock("../../../redux/store/store", () => ({
    useAppDispatch: () => mockDispatch,
}));

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

describe("UserCreate component", () => {
    const renderWithProviders = () =>
        render(
        <ThemeProvider theme={Theme}>
            <MemoryRouter>
            <UserCreate />
            </MemoryRouter>
        </ThemeProvider>
        );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render the form inputs", () => {
        renderWithProviders();
        expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Apellido Paterno/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Correo Electrónico/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
    });

    it("should show validation feedback when submitting empty form", async () => {
        renderWithProviders();
        const submit = screen.getByRole("button", { name: /Crear Cuenta/i });
        fireEvent.click(submit);

        expect(screen.getByText(/Ingresa tu nombre/i)).toBeVisible();
        expect(screen.getByText(/Ingresa tu apellido paterno/i)).toBeVisible();
        expect(screen.getByText(/Ingresa un correo válido/i)).toBeVisible();
        expect(screen.getByText(/Ingresa una contraseña mínimo/i)).toBeVisible();
    });

    // it("should submit successfully and navigate home", async () => {
    //     mockDispatch.mockResolvedValueOnce({
    //         type: createUserThunk.fulfilled.type,
    //         payload: { id: 1, name: "Usuario" },
    //     });

    //     renderWithProviders();

    //     fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: "Sergio" } });
    //     fireEvent.change(screen.getByLabelText(/Apellido Paterno/i), { target: { value: "Perez" } });
    //     fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), { target: { value: "mail@mail.com" } });
    //     fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: "password123" } });
    //     fireEvent.change(screen.getByLabelText(/RFC/i), { target: { value: "XAAA010120004KT" } });
    //     fireEvent.change(screen.getByLabelText(/Fecha de Nacimiento/i), { target: { value: "2000-01-01" } });

    //     const submit = screen.getByRole("button", { name: /Crear Cuenta/i });
    //     fireEvent.click(submit);

    //     await waitFor(() => {
    //         expect(mockDispatch).toHaveBeenCalledTimes(1);
    //         expect(mockNavigate).toHaveBeenCalledWith("/");
    //     });
    // });


    // it("should show alert when submission fails", async () => {
    //     mockDispatch.mockResolvedValueOnce({ type: createUserThunk.rejected.type });

    //     renderWithProviders();

    //     fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: "Sergio" } });
    //     fireEvent.change(screen.getByLabelText(/Apellido Paterno/i), { target: { value: "Perez" } });
    //     fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), { target: { value: "mail@mail.com" } });
    //     fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: "password123" } });

    //     const submit = screen.getByRole("button", { name: /Crear Cuenta/i });
    //     fireEvent.click(submit);

    //     await waitFor(() => {
    //         expect(screen.getByText(/Cuenta ya existente/i)).toBeVisible();
    //     });


    // });
});