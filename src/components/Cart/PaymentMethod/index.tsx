import React, { Fragment, useEffect, useState } from "react";
import { CartContainer } from "../styles";
import { PaymentMethodAddButton, PaymentMethodDecoration, PaymentMethodDiv, PaymentMethodForm, PaymentMethodInput, PaymentMethodLabel, PaymentMethodPayment, PaymentMethodTitle } from "./styles";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/store/store";
import { UserHeader, UserHeaderLogo } from "../../Header/HeaderMin/styles";
import CreditForm from "./CreditForm";
import Alert from "../../Alert";
import { addAddress, addMethod } from "../../../redux/slices/cartSlice";
import AddressForm from "./AddressForm";
import { GetAddresses } from "../../../redux/slices/addresssSlice";
import { GetPaymentMethod } from "../../../redux/slices/paymentMethodSlice";
import { PostBilling } from "../../../redux/slices/billingSlice";


export type FormMethodState = {
    card_number: string,
    expiration: string,
    cvc: string,
};

export type AddressMethodState = {
    address:string,
    internal_number:string,
    external_number:string,
    postal:string,
    suburb:string,
    country:string,
}

export type AddressItem = {
    id: number;
    address: string;
    internal_number: string;
    external_number: string;
    postal: string;
    suburb: string;
    country: string;
};

export type PaymentItem = {
    id: number;
    card_number: string;
};

const PaymentMethod = () =>{
    const [showAlertError, setShowAlertError] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [selectedCard, setSelectedCard] = useState<number>();
    const [selectedAddress, setSelectedAddress] = useState<number>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const payments = useAppSelector((state) => (state.payments.payment ?? [])) as unknown as PaymentItem[];
    const addresses = useAppSelector((state) => (state.addresses.address ?? [])) as unknown as AddressItem[];
    const actualUser = useAppSelector(state=>state.user.actualUser);

    const handlePay = async () => {
        if (selectedCard && selectedAddress) {
            const storageCarts = localStorage.getItem("storageCarts");
            const carts = storageCarts ? JSON.parse(storageCarts) : [];
            const userCart = carts[0];

            if (!userCart) {
                setShowAlert(true);
                return;
            }

            const orders = userCart.product_ids.map((item: any) => ({
                product_id: item.product.id,
                count: item.count,
                total: item.count * (item.product.price * (1 - item.product.promotion / 100)),
            }));

            const billingPayload = {
                account_id: actualUser.user.id,
                address_id: selectedAddress,
                payment_id: selectedCard,
                total: userCart.total,
                orders,
            };
            console.log(billingPayload)
            const result = await dispatch(PostBilling(billingPayload as any) as any);

            if ((PostBilling.fulfilled as any).match(result)) {
                navigate("/check/");
            } else {
                setShowAlert(true);
            }
        } else {
            setShowAlert(true);
        }
    };

    useEffect(()=>{
        const storedUser = actualUser;
        const token = storedUser?.access ?? "";
        if (token) {
            dispatch(GetAddresses(token) as any);
            dispatch(GetPaymentMethod(token) as any);
        }
    },[dispatch]);

    const MethodView = () => (
        <CartContainer>
            <PaymentMethodDecoration>
                {/* Dirección de envio */}
                <PaymentMethodTitle>Asignar Dirección</PaymentMethodTitle>
                <PaymentMethodForm>
                    {addresses && addresses.map((address: AddressItem)=>(
                        <PaymentMethodDiv key={address.id}>
                            <PaymentMethodInput
                                type="radio"
                                id={`${address.id}`}
                                name="payment_card"
                                value={`address_${address.id}`}
                                onChange={(e)=>setSelectedAddress(Number(e.target.id))}
                            />
                            <PaymentMethodLabel htmlFor={`${address.id}`}>
                                {`Calle: ${address.address}, Codigo Postal: ${address.postal}, País: ${address.country}`}
                            </PaymentMethodLabel>
                        </PaymentMethodDiv>
                    )) }
                <PaymentMethodAddButton 
                    data-testid="add_address_button"
                    onClick={()=>setShowAddressForm(true)}
                    aria-label="Agregar una nueva dirección de envio"
                    aria-haspopup="dialog"
                    aria-controls="addressAddModal"
                    >
                    <i className="fi fi-rs-plus"></i>
                    <p>Agregar dirección</p>
                </PaymentMethodAddButton>
                </PaymentMethodForm>

                {/* Método de pago */}

                <PaymentMethodTitle>Asignar Método de pago</PaymentMethodTitle>
                <PaymentMethodForm>
                    {payments && payments.map((card:PaymentItem)=>(
                        <PaymentMethodDiv key={card.id}>
                            <PaymentMethodInput
                                type="radio"
                                id={`${card.id}`}
                                name="payment_card"
                                value={card.card_number}
                                onChange={(e)=>setSelectedCard(Number(e.target.id))}
                            />
                            <PaymentMethodLabel htmlFor={`${card.id}`}>
                                {card.card_number.slice(-4).padStart(card.card_number.length, "*")}
                            </PaymentMethodLabel>
                        </PaymentMethodDiv>
                    ))}
                    <PaymentMethodAddButton 
                        data-testid="add_method_button"
                        onClick={()=>setShowForm(true)}
                        aria-label="Agregar una nueva tarjeta para el pago"
                        aria-haspopup="dialog"
                        aria-controls="creditAddModal">
                        <i className="fi fi-rs-plus"></i>
                        <p>Agregar método de pago</p>
                    </PaymentMethodAddButton>
                </PaymentMethodForm>
                <PaymentMethodPayment>
                    <button
                        data-testid="go_button" 
                        type="button" onClick={handlePay}
                        aria-label="Realizar el pago">
                        Pagar
                    </button>
                </PaymentMethodPayment>
            </PaymentMethodDecoration>
        </CartContainer>
    );

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
            {MethodView()}
            <AddressForm
                visible={showAddressForm}
                onClose={()=>setShowAddressForm(false)}
                onAlert={()=>setShowAlert(true)}
            />
            <CreditForm 
                visible={showForm}
                onClose={()=>setShowForm(false)}
                onAlert={()=>setShowAlert(true)}
            />
            <Alert
                id="alert_product"
                title={"Tarjeta inválida"} 
                message={"Debes asignar una tarjeta nueva y con los datos correctos."}
                action={() => setShowAlertError(false)}
                visible={showAlertError}/>
            <Alert
                id="alert_product"
                title={
                    !selectedCard ? "Tarjeta no seleccionada" : 
                    !selectedAddress ? "Dirección no seleccionada" : "22"
                } 
                message={
                    !selectedCard ? "Debes seleccionar una tarjeta.":
                    !selectedAddress ? "Debes seleccionar una dirección." : "22"
                }
                action={() => setShowAlert(false)}
                visible={showAlert}/>
        </Fragment>
    );
};



export default PaymentMethod;