import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { ThemeProvider } from "styled-components";
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";
import ProductNavigate from ".";
import Theme from "../../../../theme";
import { useAppSelector } from "../../../../redux/store/store";
import ProductList from ".";
import { Products } from "../../../../redux/slices/productSlice";
const mockDispatch = jest.fn();

jest.mock("../../../../redux/store/store", () => ({
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

describe("Product Navigate component",()=>{
    const renderWithProviders = (list:Products[]) => {
        return render(
            <ThemeProvider theme={Theme}>
                <MemoryRouter >
                    <ProductList list={list}/>
                </MemoryRouter>
            </ThemeProvider>
        );
    }
    
    it("should render the product list of the catalog selected",()=>{
        
        const products:Products[] = [
            {id: 1,image_url: "url",name: "Nioh 3",release_date: "2026-02-01",description: "prueba",price: 2169.99,promotion: 15,company_id:9,category_id:2,},
            {id: 2,image_url: "url",name: "Prueba",release_date: "2026-02-01",description: "prueba",price: 2169.99,promotion: 15,company_id:9,category_id:2,},
        ]
        renderWithProviders(products);
        const name = screen.getByText("Prueba");
        expect(name).toBeInTheDocument();
    });
});