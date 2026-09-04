import React, { Fragment, useState } from "react";
import { Products } from "../../../redux/slices/productSlice";
import { ProductButton, ProductContainer, ProductData, ProductDiscount, ProductImagen, ProductPrice, ProductTitle } from "./styles";
import { useAppSelector } from "../../../redux/store/store";
import { useDispatch } from "react-redux";
import { addCart } from "../../../redux/slices/cartSlice";
import Alert from "../../Alert";
import { useNavigate } from "react-router-dom";

interface ProductProps {
    product:Products
}

const Product = ({product}:ProductProps) =>{
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();
    const user = useAppSelector(state=>state.user.actualUser);
    const dispatch = useDispatch();
    const addProduct = (product:Products) => {
        if(user){
            dispatch(addCart({user,product}));
        }else{
            setShowAlert(true);
        }   
    };

    const checkDetails = (id:number) => {
        navigate(`/product/${id}`);
    }
    console.log(product)
    return (
        <Fragment>
            <ProductData>
                <ProductContainer 
                    data-testid="product_container"
                    key={product.id}
                    $hasDiscount={!!product.promotion}
                    onClick={()=>checkDetails(product.id)}>
                    <ProductImagen>
                        <img
                            src={product.image_url}
                            alt={`Imagen del producto ${product.name}`}/>
                    </ProductImagen>
                    <ProductTitle>{product.name}</ProductTitle>
                    
                    {
                        product.promotion && (
                            <>
                                <ProductDiscount
                                    aria-label="Descuento asignado"
                                    >{product.promotion}%</ProductDiscount>
                                <ProductPrice 
                                    $isTotal={false} 
                                    aria-label="Precio original">
                                    ${product.price}
                                </ProductPrice>
                            </>
                        )
                    }
                    <ProductPrice 
                        aria-label="Precio final del producto"
                        data-testid="total_price"
                        $isTotal={true}>
                            ${((product.price * (1-(product.promotion/100)))).toFixed(2)}
                        
                    </ProductPrice>
                    
                </ProductContainer>
                <ProductButton
                    aria-label="Agregar producto al carrito"
                    onClick={()=>addProduct(product)}>
                        Guardar al carrito
                </ProductButton>
            </ProductData>
            
            <Alert 
                id="alert_product"
                title={"Acceder a cuenta"} 
                message={"Se necesita ingresar a la cuenta o crear una para agregar productos al carrito."}
                action={() => setShowAlert(false)}
                visible={showAlert}/>
        </Fragment>
    );
}

export default Product;