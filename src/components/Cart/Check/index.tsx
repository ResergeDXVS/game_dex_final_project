import React, { Fragment, useEffect } from "react";
import {
  CheckAddress,
  CheckContainer,
  CheckDecoration,
  CheckErrorContainer,
  CheckItems,
  CheckMethod,
  CheckPayment,
  CheckProduct,
  CheckProductDiscount,
  CheckProductName,
  CheckProductNumber,
  CheckProductOriginalPrice,
  CheckProductTotal,
  CheckSubTitle,
  CheckTitle,
} from "./styles";
import { useAppDispatch, useAppSelector } from "../../../redux/store/store";
import { UserHeader, UserHeaderLogo } from "../../Header/HeaderMin/styles";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../../redux/slices/cartSlice";
import { GetBilling } from "../../../redux/slices/billingSlice";

const Check = () => {
    const actualUser = useAppSelector((state) => state.user.actualUser);
    const billing = useAppSelector((state) => state.billings.billings);

    // si billings es array, tomamos el último
    const currentBilling = Array.isArray(billing)
        ? billing[billing.length - 1]
        : billing;

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const clearAndReturn = () => {
        if (actualUser) dispatch(clearCart(actualUser));
        navigate("/");
    };

    useEffect(() => {
        const token = actualUser?.access ?? "";
        if (token) {
        dispatch(GetBilling(token) as any);
        }
    }, [dispatch]);

    const CheckView = () => (
        <CheckContainer>
        <CheckDecoration>
            <CheckTitle>Gracias por tu compra</CheckTitle>
            <CheckSubTitle>Te mandaremos tu ticket a tu correo.</CheckSubTitle>

            <CheckItems>
            {currentBilling?.orders?.map((order) => (
                <CheckProduct key={order.id}>
                <CheckProductNumber>{order.count} X</CheckProductNumber>
                <CheckProductName>{order.product.name}</CheckProductName>
                <CheckProductOriginalPrice>
                    ${order.product.price}
                </CheckProductOriginalPrice>
                <CheckProductDiscount>
                    {order.product.promotion}%
                </CheckProductDiscount>
                <CheckProductTotal>
                    $ {(
                    order.count *
                    (order.product.price *
                        (1 - order.product.promotion / 100))
                    ).toFixed(2)}
                </CheckProductTotal>
                </CheckProduct>
            ))}
            </CheckItems>

            <CheckAddress>
            Envío de los productos a "
            {` Calle ${currentBilling?.address?.address}, Número exterior ${currentBilling?.address?.external_number}, `}
            {currentBilling?.address?.internal_number &&
                `Número interior ${currentBilling?.address?.internal_number}, `}
            {`C.P. ${currentBilling?.address?.postal}, Colonia ${currentBilling?.address?.suburb}, ${currentBilling?.address?.country}`} "
            </CheckAddress>

            <CheckMethod>
            {`Método de pago ${currentBilling?.payment?.card_number
                .slice(-4)
                .padStart(currentBilling?.payment?.card_number.length, "*")}`}
            </CheckMethod>

            <CheckTitle>Total Pagado ${currentBilling?.total}</CheckTitle>

            <CheckPayment>
            <button
                data-testid="button_return"
                onClick={clearAndReturn}
                aria-label="Botón para regresar a la página principal"
            >
                Regresar a la página
            </button>
            </CheckPayment>
        </CheckDecoration>
        </CheckContainer>
    );

    const ErrorView = () => (
        <CheckErrorContainer>
        <CheckTitle>
            No se ha encontrado información completa de tu carrito, favor de entrar
            desde el menú principal
        </CheckTitle>
        </CheckErrorContainer>
    );

    return (
        <Fragment>
        <UserHeader
            onClick={() => navigate("/")}
            aria-label="Ir a la pantalla principal"
        >
            <UserHeaderLogo>
            <img src="/img/GAME-DEX-LOGO.png" alt="GAMES DEX" />
            <p>GAME DEX</p>
            </UserHeaderLogo>
        </UserHeader>
        {currentBilling ? CheckView() : ErrorView()}
        </Fragment>
    );
};

export default Check;
