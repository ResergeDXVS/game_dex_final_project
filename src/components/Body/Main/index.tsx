import React, { Fragment, useEffect } from "react";
import Header from "../../Header";
import Footer from "../../Footer";
import Carousel from "../Carousel";
import Companies from "../Companies";
import { useAppSelector } from "../../../redux/store/store";
import { ProductTitles } from "./styles";
import { getProductListMain } from "../../../redux/slices/productSlice";
import ProductList from "../Products/ProductList";
import { useDispatch } from "react-redux";
import { ASYNC_STATUS } from "../../../constants/asyncState";

const Main = () => {
    const {list, status } = useAppSelector(state=>state.product);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getProductListMain() as any);
        
    },[dispatch]);
    
    const structure = () => {
        console.log(list);
        return (
            <ProductList list={list}/>
        )
    }

    const errors = () => (
        <p>Error en la búsqueda</p>
    )
    const charging = () => (
        <p>Cargando</p>
    )

    const render = () => {
        if (status === ASYNC_STATUS.PENDING ){
            return charging();
        }else if(status === ASYNC_STATUS.REJECTED){
            return errors();
        }else{
            return structure();
        }
    }
    
    return(
        <Fragment>
            <Header/>
                <Carousel/>
                <Companies/>
                <ProductTitles>Alguno de nuestros productos</ProductTitles>
                {render()}
            <Footer/>
        </Fragment>
    );
}

export default Main;