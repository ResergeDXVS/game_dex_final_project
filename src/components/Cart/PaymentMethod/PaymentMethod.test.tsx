import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { ThemeProvider } from "styled-components";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../redux/store/store";
import Theme from "../../../theme";
import PaymentMethod from ".";


const mockDispatch = jest.fn();

jest.mock("../../../redux/store/store", () => ({
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
    const renderWithProviders = () => {
        return render(
            <ThemeProvider theme={Theme}>
                <MemoryRouter >
                    <PaymentMethod/>
                </MemoryRouter>
            </ThemeProvider>
        );
    }
    it("should not render the payment method form",()=>{
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
            data: {
                categories: [
                    {id:1,category:"Consolas"},
                    {id:2,category:"Juegos"},
                ],
                companies: [
                    {
                        id:1,
                        name:"company",
                        image:"url"
                    }
                ]
            },
            cart:{
                carts:[
                    {
                        user_id: 1,
                        product_ids: [
                            {
                                product:{
                                    id: 2,image: "url",name: "Nioh 3",release_date: "2026-02-01",description: "prueba",price: 100,promotion: 15,company_id:9,category_id:2,
                                },
                                count:1,
                            },
                        ],
                        total: 85,
                        payment_id: 1,
                        address_id: 1,
                    },
                ],
            },
            product: {
                products: [
                    {id: 2,image: "url",name: "Nioh 3",release_date: "2026-02-01",description: "prueba",price: 100,promotion: 15,company_id:1,category_id:2,}
                ]
            },
            payments:{
                payment:[
                    {
                        user_id: 1,
                        id: 1,
                        card_number: "1122334455112233",
                        expiration: "12/31",
                        cvc: "335",
                    },
                ],
                    
            },
            addresses:{
                address:[
                    {
                        user_id: 1,
                        id: 1,
                        address:"Calle falsa",
                        internal_number:"23",
                        external_number:"1",
                        postal:"12000",
                        suburb:"Tlalpan",
                        country:"México",
                    }
                ]
            }
        }));
        renderWithProviders();
        const address_txt = screen.getByText("Asignar Dirección");
        expect(address_txt).toBeInTheDocument();
        const check_txt = screen.getByText("Asignar Método de pago");
        expect(check_txt).toBeInTheDocument();
    });
    it("should render the form and click the inputs",()=>{
        mockedUseNavigate.mockReturnValue(mockNavigate);
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
            data: {
                categories: [
                    {id:1,category:"Consolas"},
                    {id:2,category:"Juegos"},
                ],
                companies: [
                    {
                        id:1,
                        name:"company",
                        image:"url"
                    }
                ]
            },
            cart:{
                carts:[
                    {
                        user_id: 1,
                        product_ids: [
                            {
                                product:{
                                    id: 2,image: "url",name: "Nioh 3",release_date: "2026-02-01",description: "prueba",price: 100,promotion: 15,company_id:9,category_id:2,
                                },
                                count:1,
                            },
                        ],
                        total: 85,
                        payment_id: 1,
                        address_id: 1,
                    },
                ],
            },
            product: {
                products: [
                    {id: 2,image: "url",name: "Nioh 3",release_date: "2026-02-01",description: "prueba",price: 100,promotion: 15,company_id:1,category_id:2,}
                ]
            },
            payments:{
                payment:[
                    {
                        user_id: 1,
                        id: 1,
                        card_number: "1122334455112233",
                        expiration: "12/31",
                        cvc: "335",
                    },
                ],
                    
            },
            addresses:{
                address:[
                    {
                        user_id: 1,
                        id: 1,
                        address:"Calle falsa",
                        internal_number:"23",
                        external_number:"1",
                        postal:"12000",
                        suburb:"Tlalpan",
                        country:"México",
                    }
                ]
            }
        }));
        renderWithProviders();
        const input_method = screen.getByDisplayValue("address_1");
        const input_address = screen.getByDisplayValue("1122334455112233");
        const button = screen.getByTestId("go_button");
        //Seleccion incompleta
        fireEvent.click(input_method);
        fireEvent.click(button);
        const alert = screen.getByText("Entendido");
        expect(alert).toBeInTheDocument();
        const message = screen.queryByText("Dirección no seleccionada");
        expect(message).toBeNull();
        //Seleccion completa
        fireEvent.click(input_address);
        fireEvent.click(button);
        expect(mockDispatch).toHaveBeenCalledTimes(2);
        expect(mockNavigate).toHaveBeenCalledWith("/check/");
    });

    it("should render the form use the add a new address",()=>{
        mockedUseNavigate.mockReturnValue(mockNavigate);
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
            data: {
                categories: [
                    {id:1,category:"Consolas"},
                    {id:2,category:"Juegos"},
                ],
                companies: [
                    {
                        id:1,
                        name:"company",
                        image:"url"
                    }
                ]
            },
            cart:{
                carts:[
                    {
                        user_id: 1,
                        product_ids: [
                            {
                                product:{
                                    id: 2,image: "url",name: "Nioh 3",release_date: "2026-02-01",description: "prueba",price: 100,promotion: 15,company_id:9,category_id:2,
                                },
                                count:1,
                            },
                        ],
                        total: 85,
                        payment_id: 1,
                        address_id: 1,
                    },
                ],
            },
            product: {
                products: [
                    {id: 2,image: "url",name: "Nioh 3",release_date: "2026-02-01",description: "prueba",price: 100,promotion: 15,company_id:1,category_id:2,}
                ]
            },
            payments:{
                payment:[
                    {
                        user_id: 1,
                        id: 1,
                        card_number: "1122334455112233",
                        expiration: "12/31",
                        cvc: "335",
                    },
                ],
                    
            },
            addresses:{
                address:[
                    {
                        user_id: 1,
                        id: 1,
                        address:"Calle falsa",
                        internal_number:"23",
                        external_number:"1",
                        postal:"12000",
                        suburb:"Tlalpan",
                        country:"México",
                    }
                ]
            }
        }));
        renderWithProviders();
        const button = screen.getByTestId("add_address_button");
        fireEvent.click(button);
        const text = screen.getByText("Calle");
        expect(text).toBeInTheDocument();
        const cancel = screen.getByTestId("form_address_cancel");
        fireEvent.click(cancel);

    });

    it("should render the form use the add a new payment method",()=>{
        mockedUseNavigate.mockReturnValue(mockNavigate);
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
            data: {
                categories: [
                    {id:1,category:"Consolas"},
                    {id:2,category:"Juegos"},
                ],
                companies: [
                    {
                        id:1,
                        name:"company",
                        image:"url"
                    }
                ]
            },
            cart:{
                carts:[
                    {
                        user_id: 1,
                        product_ids: [
                            {
                                product:{
                                    id: 2,image: "url",name: "Nioh 3",release_date: "2026-02-01",description: "prueba",price: 100,promotion: 15,company_id:9,category_id:2,
                                },
                                count:1,
                            },
                        ],
                        total: 85,
                        payment_id: 1,
                        address_id: 1,
                    },
                ],
            },
            product: {
                products: [
                    {id: 2,image: "url",name: "Nioh 3",release_date: "2026-02-01",description: "prueba",price: 100,promotion: 15,company_id:1,category_id:2,}
                ]
            },
            payments:{
                payment:[
                    {
                        user_id: 1,
                        id: 1,
                        card_number: "1122334455112233",
                        expiration: "12/31",
                        cvc: "335",
                    },
                ],
                    
            },
            addresses:{
                address:[
                    {
                        user_id: 1,
                        id: 1,
                        address:"Calle falsa",
                        internal_number:"23",
                        external_number:"1",
                        postal:"12000",
                        suburb:"Tlalpan",
                        country:"México",
                    }
                ]
            }
        }));
        renderWithProviders();
        const button = screen.getByTestId("add_method_button");
        fireEvent.click(button);
        const text = screen.getByText("Asignar Dirección");
        expect(text).toBeInTheDocument();
        const cancel = screen.getByTestId("form_address_cancel");
        fireEvent.click(cancel);
    });

    
});