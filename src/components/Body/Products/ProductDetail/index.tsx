import React, { Fragment, useEffect, useState } from "react"
import { ProductDetailButton, ProductDetailContainer, ProductDetailDescription, ProductDetailDiscount, ProductDetailImagen, ProductDetailPrice, ProductDetailTitle, TitlesDetails } from "./styles";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../../../redux/store/store";
import Header from "../../../Header";
import Footer from "../../../Footer";
import Alert from "../../../Alert";
import { addCart } from "../../../../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import { getProductDetail, Products } from "../../../../redux/slices/productSlice";
import { ASYNC_STATUS } from "../../../../constants/asyncState";
import { InformationMsg } from "../../Companies/styles";
import { Circles } from "react-loader-spinner";
import Theme from "../../../../theme";
const ProductDetail = () => {
    const [showAlert, setShowAlert] = useState(false);
    const param = useParams<{id:string}>();
    const {detail, status} = useAppSelector(state=>state.product);
    const dispatch = useDispatch();
    const user = useAppSelector(state=>state.user.actualUser);


    useEffect(()=>{
        const productId = Number(param.id);
        if (param.id && !Number.isNaN(productId)) {
            dispatch(getProductDetail(productId) as any);
        }
    },[]);


    const addProduct = (product: Products) => {
        if (!product) return;
        if (user) {
            dispatch(addCart({ product }));
        } else {
            setShowAlert(true);
        }
    };

    
    const structure = () => (
        <Fragment>
            <TitlesDetails>Información del Producto</TitlesDetails>
            <ProductDetailContainer>
                <ProductDetailImagen>
                    <img
                        src={detail.image_url}
                        alt={`Fotografía del producto ${detail.name}`}/>
                </ProductDetailImagen>
                <ProductDetailTitle>
                    <h2>Nombre del producto: </h2>
                    <p>{detail.name}</p>
                </ProductDetailTitle>
                <ProductDetailPrice 
                    $isTotal={!!detail.promotion}
                    $area={"precio"}>
                    <h3>Precio original</h3>
                    <p>${detail.price}</p>
                </ProductDetailPrice>
                {
                    detail.promotion && (
                        <>
                            <ProductDetailDiscount>
                                <h4>Descuento del: </h4>
                                <p>{detail.promotion}%</p>
                            </ProductDetailDiscount>
                            <ProductDetailPrice 
                                $isTotal={false}
                                $area="total">
                                <h3>Precio con descuento:</h3>
                                <p>${(detail.price * (1-(detail.promotion/100))).toFixed(2)}</p>
                            </ProductDetailPrice>
                        </>
                    )
                }
                <ProductDetailDescription>
                    <h3>Descripción: </h3>
                    <p>{detail.description}</p>
                </ProductDetailDescription>
                <ProductDetailButton data-testid="buttonCart" onClick={()=>detail && addProduct(detail)}>Guardar al carrito</ProductDetailButton>
            </ProductDetailContainer>
            <Alert
                id="alert_product"
                title={"Acceder a cuenta"} 
                message={"Se necesita ingresar a la cuenta o crear una para agregar productos al carrito."}
                action={() => setShowAlert(false)}
                visible={showAlert}/>
        </Fragment>
    )

    const error = () => (
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
            return error();
        }else{
            return structure();
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

export default ProductDetail;
