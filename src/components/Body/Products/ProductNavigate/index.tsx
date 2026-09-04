import React, { Fragment, useEffect } from "react"
import { useLocation, useParams } from "react-router-dom"
import { useAppSelector } from "../../../../redux/store/store";
import Footer from "../../../Footer";
import { getProductListCategory, Products } from "../../../../redux/slices/productSlice";
import ProductList from "../ProductList";
import { ProductNavigateTitle, ProductNavigateContainer, ProductNavigateErrorContainer, ProductNavigateError } from "./styles";
import Header from "../../../Header";
import { useDispatch } from "react-redux";
import { ASYNC_STATUS } from "../../../../constants/asyncState";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const ProductNavigate = () => {
    const {list, status} = useAppSelector(state=>state.product);
    const { category } = useParams<{category:string}>();
    const dispatch = useDispatch();

    useEffect(()=>{
        if (category) {
            dispatch(getProductListCategory(category) as any);
        }
    },[dispatch, category]);

    const validProducts = (tag:string | undefined,list:Products[]) => (
        <ProductNavigateContainer>
            <ProductNavigateTitle>Catálogo de {tag}</ProductNavigateTitle>
            <ProductList list={list}/>
        </ProductNavigateContainer>
    );

    const errorListView = (message:string) => (
        <ProductNavigateErrorContainer aria-labelledby="productNavigateModalError">
            <ProductNavigateError
                id="productNavigateModalError">{message}</ProductNavigateError>
        </ProductNavigateErrorContainer>
    );

    const charging = () => (
        <ProductNavigateErrorContainer aria-labelledby="productNavigateModalError">
            <ProductNavigateError
                id="productNavigateModalError">CARGANDO...</ProductNavigateError>
        </ProductNavigateErrorContainer>
    );

    const render = () => {
        if(status === ASYNC_STATUS.PENDING){
            return charging();
        }else if(status === ASYNC_STATUS.REJECTED){
            return errorListView(`Error en la carga de la página`);
        }else{
            
            if(category){
                return validProducts(category,list);
            }else{
                return errorListView("Error en la busqueda de productos.");
            }

        }
        
        
    }

    return(
        <Fragment>
            <Header/>
            {render()}
            <Footer/>
        </Fragment>
    );
}

export default ProductNavigate;