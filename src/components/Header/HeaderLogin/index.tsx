import React, { Fragment } from "react";
import { LoginButton, LoginContainer } from "./styles";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../redux/store/store";
import { useDispatch } from "react-redux";
import { closeUser } from "../../../redux/slices/userSlice";

const HeaderLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const actualUser = useAppSelector(state=>state.user.actualUser);
    const closeSessionAction = () => {
        dispatch(closeUser());
    }


    const accessButtons = () => (
        <Fragment>
            <p>Para comprar en Game Dex</p>
            <LoginButton $login={true}
                onClick={()=>navigate("/user/login")}
                aria-label="Ir a la pantalla para ingresar a cuenta">
                Ingresar a cuenta
            </LoginButton>
            <p>O</p>
            <LoginButton $login={false}
                onClick={()=>navigate("/user/create")}
                aria-label="Ir a pantalla para crear un nuevo usuario">
                Crear Usuario
            </LoginButton>
        </Fragment>
    )

    const closeSession = () => (
        <Fragment>
            <p>
                Hola {actualUser.user.name}
            </p>
            <LoginButton $login={true}
                onClick={()=>closeSessionAction()}
                aria-label="Botón para cerrar sesión del usuario">
                Cerrar Sesión
            </LoginButton>
        </Fragment>
    )

    const renderButtons = () => {
        if(!actualUser) return accessButtons();
        else return closeSession();
    }

    return(
        <LoginContainer>
            {renderButtons()}
        </LoginContainer>
    );
};

export default HeaderLogin;