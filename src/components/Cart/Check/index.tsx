import React, { Fragment } from "react";
import { CheckAddress, CheckContainer, CheckDecoration, CheckErrorContainer, CheckItems, CheckMethod, CheckPayment, CheckProduct, CheckProductDiscount, CheckProductName, CheckProductNumber, CheckProductOriginalPrice, CheckProductTotal, CheckSubTitle, CheckTitle } from "./styles";
import { useAppDispatch, useAppSelector } from "../../../redux/store/store";
import { UserHeader, UserHeaderLogo } from "../../Header/HeaderMin/styles";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../../redux/slices/cartSlice";


const Check = () => {
    const actualUser = useAppSelector(state=>state.user.actualUser);
    const carts = useAppSelector(state=>state.cart.carts);
    const address = useAppSelector(state=>state.addresses.address);
    const payments = useAppSelector(state=>state.payments.payment);
    const actualCart = carts[0];
    const addressSelected = (address as unknown as Array<{
        address_id: typeof actualCart extends undefined ? never : string | number;
        address: string;
        external_number: string;
        internal_number: string;
        postal: string;
        suburb: string;
        country: string;
    }>).find(add => String(add.address_id) === String(actualCart?.address_id));
    const methodSelected = payments.find((method: unknown) => method === actualCart?.payment_id) as unknown as { card_number: string } | undefined;
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const clearAndReturn = () => {
        if (actualUser) dispatch(clearCart(actualUser));
        navigate("/");

    }

    const CheckView = () => (
        <CheckContainer>
            <CheckDecoration>
                <CheckTitle>Gracias por tu compra</CheckTitle>
                <CheckSubTitle>Te mandaremos tu ticket a tu correo.</CheckSubTitle>
                <CheckItems>
                    {
                        actualCart && (
                            actualCart.product_ids.map(items=>{
                                const { product, count }=items; 
                                return(
                                    <CheckProduct>
                                        <CheckProductNumber>
                                            {count} X
                                        </CheckProductNumber>
                                        <CheckProductName>
                                            {product.name}
                                        </CheckProductName>
                                        <CheckProductOriginalPrice>
                                            ${product.price}
                                        </CheckProductOriginalPrice>
                                        <CheckProductDiscount>
                                            {product.promotion}%
                                        </CheckProductDiscount>
                                        <CheckProductTotal>
                                            ${(count*(product.price * (1-(product.promotion/100)))).toFixed(2)}
                                        </CheckProductTotal>
                                    </CheckProduct>
                                );
                            })
                        )
                    }
                </CheckItems>
                <CheckAddress>Envio de los productos a "
                    {` Calle ${addressSelected?.address}, Número exterior ${addressSelected?.external_number}, `}
                    { addressSelected?.internal_number !== "" && `Numero interior ${addressSelected?.internal_number}, `}
                    {`C.P. ${addressSelected?.postal}, Colonia ${addressSelected?.suburb}, ${addressSelected?.country}`} "
                </CheckAddress>
                <CheckMethod>
                    
                    {`Método de pago ${methodSelected?.card_number.slice(-4).padStart(methodSelected?.card_number.length, "*")}`}
                </CheckMethod>
                <CheckTitle>Total Pagado ${actualCart?.total}</CheckTitle>
                <CheckPayment>
                    <button
                        data-testid="button_return" 
                        onClick={()=>clearAndReturn()}
                        aria-label="Botón para regresar a la página principal">
                        Regresar a la página
                    </button>
                    
                </CheckPayment>
            </CheckDecoration>
        </CheckContainer>
    )

    const ErrorView = () => (
        <CheckErrorContainer>
            <CheckTitle>No se ha encontrado información completa de tu carrito, favor de entrar desde el menú principal</CheckTitle>
        </CheckErrorContainer>
    );
    const render = () => {
        if (actualCart) return CheckView();
        else return ErrorView();
    }
    return(
        <Fragment>
            <UserHeader
                onClick={()=>{navigate("/")}}
                aria-label="Ir a la pantalla principal">
                <UserHeaderLogo>
                    <img src="/img/GAME-DEX-LOGO.png" alt="GAMES DEX"/>
                    <p>GAME DEX</p>
                </UserHeaderLogo>
            </UserHeader>
            {render()}
        </Fragment>
    );
}
export default Check;