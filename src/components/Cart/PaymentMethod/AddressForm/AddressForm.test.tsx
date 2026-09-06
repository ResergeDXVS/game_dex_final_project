import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { ThemeProvider } from "styled-components";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../redux/store/store";
import Theme from "../../../../theme";
import AddressForm from ".";
//import { createAddressThunk } from "../../../../redux/slices/addresssSlice";

const mockDispatch = jest.fn();

jest.mock("../../../../redux/store/store", () => ({
    useAppSelector: jest.fn(),
    useAppDispatch: () => mockDispatch,
}));

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: () => mockDispatch,
}));
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
}));


const mockedSelector = useAppSelector as jest.Mock;
const mockedUseNavigate = useNavigate as jest.Mock;
const mockNavigate = jest.fn();
const mockClose = jest.fn();
const mockAlert = jest.fn();

describe("Address Form component",()=>{
    const renderWithProviders = (visible:boolean) => {
        return render(
            <ThemeProvider theme={Theme}>
                <MemoryRouter >
                    <AddressForm
                        visible={visible}
                        onClose={mockClose}
                        onAlert={mockAlert}/>
                </MemoryRouter>
            </ThemeProvider>
        );
    }
    it("should not render the address form",()=>{
        renderWithProviders(false);
        const form = screen.getByTestId("form_address");
        expect(form).not.toHaveClass("form--show");

    });

    it("should render the address form and input data",()=>{
        renderWithProviders(true);
        const form = screen.getByTestId("form_address");
        expect(form).toHaveClass("form--show");
        const calle = screen.getByLabelText(/Calle/i) as HTMLInputElement;
        fireEvent.change(calle, { target: { value: "Calle Falsa" } });
        expect(calle.value).toBe("Calle Falsa");
        const exterior = screen.getByLabelText(/Número exterior/i) as HTMLInputElement;
        fireEvent.change(exterior, { target: { value: "1112" } });
        expect(exterior.value).toBe("1112");
        const interior = screen.getByLabelText(/Número Interno/i) as HTMLInputElement;
        fireEvent.change(interior, { target: { value: "76" } });
        expect(interior.value).toBe("76");
        const postal = screen.getByLabelText(/Código Postal/i) as HTMLInputElement;
        fireEvent.change(postal, { target: { value: "12420" } });
        expect(postal.value).toBe("12420");
        const colonia = screen.getByLabelText(/Colonia/i) as HTMLInputElement;
        fireEvent.change(colonia, { target: { value: "Texcoco" } });
        expect(colonia.value).toBe("Texcoco");
        const pais = screen.getByLabelText(/Pais/i) as HTMLInputElement;
        fireEvent.change(pais, { target: { value: "México" } });
        expect(pais.value).toBe("México");
    });

    it("should render the address form be closed",()=>{
        renderWithProviders(true);
        const cancel = screen.getByTestId("form_address_cancel");
        fireEvent.click(cancel);
        expect(mockClose).toHaveBeenCalledTimes(1);
    });

    // it("should render the address form, input data and submit it",async ()=>{
    //     mockDispatch.mockResolvedValueOnce({
    //         type: createAddressThunk.rejected.type,
    //         error: { message: "Rejected" },
    //         meta: {},
    //     });

    //     renderWithProviders(true);
    //     const submit = screen.getByTestId("form_address_submit");
    //     fireEvent.click(submit);
    //     await screen.findByTestId("form_address_submit");
    //     expect(mockAlert).toHaveBeenCalledTimes(1);


    //     mockDispatch.mockResolvedValueOnce({
    //         type: createAddressThunk.fulfilled.type,
    //         error: { message: "" },
    //         meta: {},
    //     });
    //     fireEvent.click(submit);
    //     await screen.findByTestId("form_address_submit");
    //     expect(mockClose).toHaveBeenCalledTimes(1);

    // });
});