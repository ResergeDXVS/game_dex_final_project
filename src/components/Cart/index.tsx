import React, { Fragment } from "react";
import { UserHeader, UserHeaderLogo } from "../Header/HeaderMin/styles";
import { CartContainer, CartDecoration, CartDecorationError, CartDeleteButton, CartPayment, CartProduct, CartProductDiscount, CartProductImage, CartProductName, CartProductNumber, CartProductOriginalPrice, CartProductTotal, CartTitle } from "./styles";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";
import { deleteItemCart, updateCart } from "../../redux/slices/cartSlice";
const Cart = () => {
    const param = useParams<{id:string}>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const carts = useAppSelector(state => state.cart.carts);
    const actualUser = useAppSelector(state=>state.user.actualUser);
    const userCart = carts.find(cart => cart.user_id === Number(param.id));

    const updateItem = (idItem:number,count:number) =>{
        if(count === 0){
            dispatch(deleteItemCart({
                user:actualUser,
                id:idItem,
            }))
        }else{
            dispatch(updateCart({
                user: actualUser,
                id: idItem,
                countItem: count
            }));
        }
    }

    const deleteItem  = (idItem:number) =>{
        dispatch(deleteItemCart({
            user:actualUser,
            id:idItem,
        }))
    }

    const goPaymentMethod = () => {
        navigate(`/payment/`);
    }

    const cartView = () => (
        <CartContainer>
            <CartDecoration>
                <CartTitle>Tu Carrito</CartTitle>
                {
                    userCart?.product_ids && (
                        userCart.product_ids.map(productItem => {
                            const { product,count } = productItem;
                            return(
                                <CartProduct key={product.id}>
                                    <CartProductImage
                                    alt={`Imagen del producto ${product.name}`}
                                    src={product.image_url}/>
                                    <CartProductName>
                                        {product.name}
                                    </CartProductName>
                                    <CartProductOriginalPrice
                                        aria-label="Precio original">
                                        ${product.price}
                                    </CartProductOriginalPrice>
                                    <CartProductDiscount
                                         aria-label="Descuento actual"
                                        data-testid="product_promotion">
                                        {
                                            product.promotion >0 ?
                                            product.promotion+'%' :
                                            ""
                                        }
                                    </CartProductDiscount>
                                    <CartProductNumber 
                                        data-testid="product_count"
                                        type="number"
                                        id={"cantidad_"+product.id}
                                        name={"cantidad_"+product.id}
                                        min="0"
                                        max="100"
                                        value={count}
                                        onChange={(e)=>updateItem(product.id,Number(e.target.value))}
                                        aria-label="Cantidad de productos"
                                    />
                                    <CartProductTotal data-testid="product_total_price"
                                        aria-label="Precio final de compra">
                                        ${(count*(product.price * (1-(product.promotion/100)))).toFixed(2)}
                                    </CartProductTotal>
                                    <CartDeleteButton
                                        data-testid="product_delete"
                                        className="fi fi-rs-trash cart__button"
                                        aria-label="Eliminar producto del carrito"
                                        onClick={()=>deleteItem(product.id)}/>
                                </CartProduct>
                            )
                        })
                    )
                }
                <CartPayment>
                    <button
                        data-testid="go_to_pay_button"
                        onClick={()=>goPaymentMethod()}
                        aria-label="Botón para iniciar el proceso de pago">
                        Pagar ${userCart?.total}
                    </button>
                </CartPayment>
            </CartDecoration>
        </CartContainer>

    );

    const errorView = () => (
        <CartDecorationError>
            <CartTitle>
                No se puede acceder al carrito, se necesita iniciar sesión    
            </CartTitle>
        </CartDecorationError>
    );

    const emptyCart = () => (
        <CartDecorationError>
            <CartTitle>
                Tu carrito está vacio, date una vuelta por la página 
            </CartTitle>
        </CartDecorationError>

    );
    const render = () =>{
        if (!actualUser) return errorView();
        if (!userCart || !userCart.product_ids || userCart.product_ids.length===0) return emptyCart();
        else if (userCart.product_ids.length>0) return cartView();

    }
    return(
        <Fragment>
            <UserHeader
                onClick={()=>{navigate("/")}}
                aria-label="Ir a la pantalla principal">
                <UserHeaderLogo>
                    <img src="/img/GAME-DEX-LOGO.png"
                    alt="GAMES DEX"/>
                    <p>GAME DEX</p>
                </UserHeaderLogo>
            </UserHeader>
            {render()}
        </Fragment>
        
    );
}
export default Cart;