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
import { InformationMsg } from "../Companies/styles";
import { Circles } from "react-loader-spinner";
import Theme from "../../../theme";

const Main = () => {
    const {list, status } = useAppSelector(state=>state.product);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getProductListMain() as any);
        
    },[dispatch]);
    
    const structure = () => {

        return (
            <ProductList list={list}/>
        )
    }

    const errors = () => (
        <InformationMsg>
            <p>Error en la carga de datos</p>
        </InformationMsg>
    )
    const charging = () => (
        <InformationMsg>
            <div>
                <h3>Cargando...</h3>
            </div>
            <Circles
                height="80"
                width="80"
                color={Theme.colors.details}
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            /> 
        </InformationMsg>
        
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