import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { ThemeProvider } from "styled-components";
import Theme from "../../../theme";
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";
import Product from ".";
import { Products } from "../../../redux/slices/productSlice";
import { useAppSelector } from "../../../redux/store/store";
const mockDispatch = jest.fn();

jest.mock("../../../redux/store/store", () => ({
    useAppSelector: jest.fn(),
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

describe("Product component",()=>{
    const renderWithProviders = (product:Products) => {
        return render(
            <ThemeProvider theme={Theme}>
                <MemoryRouter >
                    <Product 
                        product={product}/>
                </MemoryRouter>
            </ThemeProvider>
        );
    }

    it("should render the product information",()=>{
        const productAux:Products = {id: 1,image_url: "url",name: "Example",release_date: "2026-02-01",description: "prueba",price: 1432.94,promotion: 10,company_id:9,category_id:2};
        renderWithProviders(productAux);
        const price = screen.getByText("$1432.94");
        expect(price).toBeInTheDocument();
        const total = screen.queryByTestId("total_price")?.textContent;
        expect(total).toBe("$1289.65");
    });

    it("should navigate to the product details",()=>{
        mockedUseNavigate.mockReturnValue(mockNavigate);
        const productAux:Products = {id: 13,image_url: "url",name: "Example",release_date: "2026-02-01",description: "prueba",price: 1432.94,promotion: 10,company_id:9,category_id:2};
        renderWithProviders(productAux);
        const container = screen.getByTestId("product_container");
        fireEvent.click(container);
        expect(mockNavigate).toHaveBeenCalledWith('/product/13');
    });

    it("should add to the product to the cart when the user is not logged",()=>{
        mockedSelector.mockImplementation((selectorFn: any) =>
        selectorFn({
            user:{
                actualUser:null,
            },
        }));
        mockedUseNavigate.mockReturnValue(mockNavigate);
        const productAux:Products = {id: 13,image_url: "url",name: "Example",release_date: "2026-02-01",description: "prueba",price: 1432.94,promotion: 10,company_id:9,category_id:2};
        renderWithProviders(productAux);
        const button = screen.getByRole("button",{name:/Guardar al carrito/i});
        fireEvent.click(button);
        const alert = screen.getByText("Acceder a cuenta");
        expect(alert).toBeInTheDocument();
        const alertbutton = screen.getByTestId("alert_button");
        fireEvent.click(alertbutton);
        const message = screen.queryByText(
            "Se necesita ingresar a la cuenta o crear una para agregar productos al carrito."
        );
        expect(message).not.toBeInTheDocument();
    });

    it("should add to the product to the cart when the user is logged",()=>{
        mockedSelector.mockImplementation((selectorFn: any) =>
        selectorFn({
            user:{
                actualUser:{
                    id: 1,
                    name: "Usuario",
                    paternal_surname: "Apellido",
                    maternal_surname:  null,
                    rfc: "XAAA010120004KT",
                    datebirth: "01/01/2026",
                    email: "mail@mail.com",
                    password: "password",
                }
            },
        }));
        
        mockedUseNavigate.mockReturnValue(mockNavigate);
        const productAux:Products = {id: 13,image_url: "url",name: "Example",release_date: "2026-02-01",description: "prueba",price: 1432.94,promotion: 10,company_id:9,category_id:2};
        renderWithProviders(productAux);
        const button = screen.getByRole("button",{name:/Guardar al carrito/i});
        fireEvent.click(button);
        expect(mockDispatch).toHaveBeenCalledTimes(1);
    });
});