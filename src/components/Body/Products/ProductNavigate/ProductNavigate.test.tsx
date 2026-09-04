// import { fireEvent, render, screen } from "@testing-library/react";
// import React from "react";
// import { ThemeProvider } from "styled-components";
// import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";
// import ProductNavigate from ".";
// import Theme from "../../../../theme";
// import { useAppSelector } from "../../../../redux/store/store";
// const mockDispatch = jest.fn();

// jest.mock("../../../../redux/store/store", () => ({
//     useAppSelector: jest.fn(),
// }));

// jest.mock("react-redux", () => ({
//     ...jest.requireActual("react-redux"),
//     useDispatch: () => mockDispatch,
// }));
// jest.mock("react-router-dom", () => ({
//     ...jest.requireActual("react-router-dom"),
//     useNavigate: jest.fn(),
// }));


// const mockedSelector = useAppSelector as jest.Mock;
// const mockedUseNavigate = useNavigate as jest.Mock;
// const mockNavigate = jest.fn();

// describe("Product Navigate component",()=>{
//     const renderWithProviders = (id:string) => {
//         return render(
//             <ThemeProvider theme={Theme}>
//                 <MemoryRouter initialEntries={[id]}>
//                     <Routes>
//                         <Route
//                             path="/products/"
//                             element={<ProductNavigate/>}
//                             />
//                     </Routes>
                    
//                 </MemoryRouter>
//             </ThemeProvider>
//         );
//     }
//     it("should render an error if the dont have a catalog type",()=>{
//         mockedSelector.mockImplementation((selectorFn: any) =>
//         selectorFn({
//             user:{
//                 actualUser:{
//                     id: 1,
//                     name: "Usuario",
//                     paternal_surname: "Apellido",
//                     maternal_surname:  null,
//                     rfc: "XAAA010120004KT",
//                     datebirth: "01/01/2026",
//                     email: "mail@mail.com",
//                     password: "password",
//                 }
//             },
//             data: {
//                 categories: [
//                     {id:1,category:"Consolas"},
//                     {id:2,category:"Juegos"},
//                 ],
//                 companies: [
//                     {
//                         id:1,
//                         name:"company",
//                         image:"url"
//                     }
//                 ]
//             },
//             product: {
//                 products: [
//                     {id: 1,image: "url",name: "Nioh 3",release_date: "2026-02-01",description: "prueba",price: 2169.99,promotion: 15,company_id:9,category_id:2,},
//                     {id: 2,image: "url",name: "Nioh 3",release_date: "2026-02-01",description: "prueba",price: 2169.99,promotion: 15,company_id:9,category_id:2,},
//                 ]
//             }
//         }));
//         renderWithProviders("/products/");
//         const message = screen.getByText("Error en la busqueda de productos.");
//         expect(message).toBeInTheDocument();
//     });

//     it("should render an error if the catalog doesnt exist",()=>{
//         mockedSelector.mockImplementation((selectorFn: any) =>
//         selectorFn({
//             user:{
//                 actualUser:{
//                     id: 1,
//                     name: "Usuario",
//                     paternal_surname: "Apellido",
//                     maternal_surname:  null,
//                     rfc: "XAAA010120004KT",
//                     datebirth: "01/01/2026",
//                     email: "mail@mail.com",
//                     password: "password",
//                 }
//             },
//             data: {
//                 categories: [
//                     {id:1,category:"Consolas"},
//                     {id:2,category:"Juegos"},
//                 ],
//                 companies: [
//                     {
//                         id:1,
//                         name:"company",
//                         image:"url"
//                     }
//                 ]
//             },
//             product: {
//                 products: [
//                     {id: 1,image: "url",name: "Nioh 3",release_date: "2026-02-01",description: "prueba",price: 2169.99,promotion: 15,company_id:9,category_id:2,},
//                     {id: 2,image: "url",name: "Nioh 3",release_date: "2026-02-01",description: "prueba",price: 2169.99,promotion: 15,company_id:9,category_id:2,},
//                 ]
//             }
//         }));
//         renderWithProviders("/products/?type=3");
//         const message = screen.getByText("No se encontraron productos de la categoria seleccionada.");
//         expect(message).toBeInTheDocument();
//     });

//     it("should render an error if doesnt exist any product of the catalog",()=>{
//         mockedSelector.mockImplementation((selectorFn: any) =>
//         selectorFn({
//             user:{
//                 actualUser:{
//                     id: 1,
//                     name: "Usuario",
//                     paternal_surname: "Apellido",
//                     maternal_surname:  null,
//                     rfc: "XAAA010120004KT",
//                     datebirth: "01/01/2026",
//                     email: "mail@mail.com",
//                     password: "password",
//                 }
//             },
//             data: {
//                 categories: [
//                     {id:1,category:"Consolas"},
//                     {id:2,category:"Juegos"},
//                 ],
//                 companies: [
//                     {
//                         id:1,
//                         name:"company",
//                         image:"url"
//                     }
//                 ]
//             },
//             product: {
//                 products: [
//                     {id: 1,image: "url",name: "Nioh 3",release_date: "2026-02-01",description: "prueba",price: 2169.99,promotion: 15,company_id:9,category_id:2,},
//                     {id: 2,image: "url",name: "Nioh 3",release_date: "2026-02-01",description: "prueba",price: 2169.99,promotion: 15,company_id:9,category_id:2,},
//                 ]
//             }
//         }));
//         renderWithProviders("/products/?type=1");
//         const message = screen.getByText("No se encontraron productos disponibles de la categoría Consolas.");
//         expect(message).toBeInTheDocument();
//     });

//     it("should render the product list of the catalog selected",()=>{
//         mockedSelector.mockImplementation((selectorFn: any) =>
//         selectorFn({
//             user:{
//                 actualUser:{
//                     id: 1,
//                     name: "Usuario",
//                     paternal_surname: "Apellido",
//                     maternal_surname:  null,
//                     rfc: "XAAA010120004KT",
//                     datebirth: "01/01/2026",
//                     email: "mail@mail.com",
//                     password: "password",
//                 }
//             },
//             data: {
//                 categories: [
//                     {id:1,category:"Consolas"},
//                     {id:2,category:"Juegos"},
//                 ],
//                 companies: [
//                     {
//                         id:1,
//                         name:"company",
//                         image:"url"
//                     }
//                 ]
//             },
//             product: {
//                 products: [
//                     {id: 1,image: "url",name: "Nioh 3",release_date: "2026-02-01",description: "prueba",price: 2169.99,promotion: 15,company_id:9,category_id:2,},
//                     {id: 2,image: "url",name: "Nioh 3",release_date: "2026-02-01",description: "prueba",price: 2169.99,promotion: 15,company_id:9,category_id:2,},
//                 ]
//             }
//         }));
//         renderWithProviders("/products/?type=2");
//         const message = screen.getByText("Catálogo de Juegos");
//         expect(message).toBeInTheDocument();
//     });
// });
export {};