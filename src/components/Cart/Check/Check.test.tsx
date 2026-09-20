import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { ThemeProvider } from "styled-components";
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";
import Check from ".";
import { useAppSelector } from "../../../redux/store/store";
import Theme from "../../../theme";

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

describe("Check component",()=>{
    const renderWithProviders = (id:string) => {
        return render(
            <ThemeProvider theme={Theme}>
                <MemoryRouter initialEntries={[id]}>
                    <Routes>
                        <Route
                            path="/check/"
                            element={<Check/>}
                        />
                    </Routes>
                    
                </MemoryRouter>
            </ThemeProvider>
        );
    }
    it("should render the check voucher",()=>{
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
        renderWithProviders("/check/");
        expect(screen.getByText("Gracias por tu compra")).toBeInTheDocument();
        expect(screen.getByText("1 X")).toBeInTheDocument();
        expect(screen.getByText("Total Pagado $85"));
        expect(screen.getByText("Método de pago ************2233"));

    });

    it("should check the action to return to the main page",()=>{
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
        renderWithProviders("/check/");
        const button = screen.getByTestId("button_return")
        fireEvent.click(button);
        expect(mockDispatch).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toHaveBeenCalledWith("/")
    });

    it("should render an error view",()=>{
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
                        product_ids: [],
                        total: 0,
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
        renderWithProviders("/check/");
        expect(screen.getByText("No se ha encontrado información completa de tu carrito, favor de entrar desde el menú principal")).toBeInTheDocument();
        

    });
});
