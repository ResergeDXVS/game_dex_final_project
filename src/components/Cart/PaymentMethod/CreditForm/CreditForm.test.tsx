import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { ThemeProvider } from "styled-components";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../redux/store/store";
import Theme from "../../../../theme";
import CreditForm from ".";
// import { createPaymentThunk } from "../../../../redux/slices/paymentMethodSlice";

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

describe("Credit Form component",()=>{
    const renderWithProviders = (visible:boolean) => {
        return render(
            <ThemeProvider theme={Theme}>
                <MemoryRouter >
                    <CreditForm
                        visible={visible}
                        onClose={mockClose}
                        onAlert={mockAlert}/>
                </MemoryRouter>
            </ThemeProvider>
        );
    }
    it("should not render the credit form",()=>{
        renderWithProviders(false);
        const form = screen.getByTestId("form_credit");
        expect(form).not.toHaveClass("form--show");

    });

    it("should render the credit form and input data",()=>{
        renderWithProviders(true);
        const form = screen.getByTestId("form_credit");
        expect(form).toHaveClass("form--show");
        const tarjeta = screen.getByLabelText(/Número de tarjeta/i) as HTMLInputElement;
        fireEvent.change(tarjeta, { target: { value: "1122334455667788" } });
        expect(tarjeta.value).toBe("1122334455667788");
        const expired = screen.getByLabelText(/Expiración/i) as HTMLInputElement;
        fireEvent.change(expired, { target: { value: "1112" } });
        expect(expired.value).toBe("11/12");
        const cvc = screen.getByLabelText(/CVC/i) as HTMLInputElement;
        fireEvent.change(cvc, { target: { value: "762" } });
        expect(cvc.value).toBe("762");
        
    });

    it("should render the credit form be closed",()=>{
        renderWithProviders(true);
        const cancel = screen.getByTestId("form_credit_cancel");
        fireEvent.click(cancel);
        expect(mockClose).toHaveBeenCalledTimes(1);
    });

    // it("should render the credit form, input data and submit it",async ()=>{
    //     mockDispatch.mockResolvedValueOnce({
    //         type: createPaymentThunk.rejected.type,
    //         error: { message: "Rejected" },
    //         meta: {},
    //     });

    //     renderWithProviders(true);
    //     const submit = screen.getByTestId("form_credit_submit");
    //     fireEvent.click(submit);
    //     await screen.findByTestId("form_credit_submit");
    //     expect(mockAlert).toHaveBeenCalledTimes(1);


    //     mockDispatch.mockResolvedValueOnce({
    //         type: createPaymentThunk.fulfilled.type,
    //         error: { message: "" },
    //         meta: {},
    //     });
    //     fireEvent.click(submit);
    //     await screen.findByTestId("form_credit_submit");
    //     expect(mockClose).toHaveBeenCalledTimes(1);

    // });
});