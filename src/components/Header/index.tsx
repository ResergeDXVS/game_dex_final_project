import React, { useState } from "react"
import { HeaderBase, HeaderIcons, HeaderLogo, HeaderOptions } from "./styles";
import HeaderLogin from "./HeaderLogin";
import { UserContainer } from "./HeaderLogin/styles";
import { useAppSelector } from "../../redux/store/store";
import { Link, useNavigate } from "react-router-dom";


const Header = () => {
    const navigate = useNavigate();
    const [showLogin, setShowLogin] = useState(false);
    const username = useAppSelector( state => state.user.actualUser );
    return(
        <HeaderBase>
            <HeaderLogo
                onClick={()=>{navigate("/")}}
                aria-label="Regresar a la ventana principal">
                <img src="/img/GAME-DEX-LOGO.png"
                alt="GAMES DEX"/>
                <p>GAME DEX</p>
            </HeaderLogo>
            <HeaderOptions>
                <Link 
                    to="/products/consoles"
                    aria-label="Mostrar todos las consolas disponibles">
                        Consolas
                </Link>
                <Link 
                    to="/products/games"
                    aria-label="Mostrar todos los juegos disponibles">
                        Juegos
                </Link>
                <Link 
                    to="/products/controls"
                    aria-label="Mostrar todos los controles disponibles">
                        Controles
                </Link>
                <Link 
                    to="/products/passes"
                    aria-label="Mostrar todos los pases de consolas disponibles">
                        Pases
                </Link>
                <Link 
                    to="/products/accessories"
                    aria-label="Mostrar todos los accesorios disponibles">
                        Accesorios
                </Link>
            </HeaderOptions>
            <HeaderIcons>
                <div id="icon-user" 
                    data-testid="icon_user"
                    aria-label="Acciones de usuario"
                    aria-controls="userActionsModal"
                    aria-haspopup="dialog"
                    onClick={() => setShowLogin(prev => !prev)}>
                    {
                        username===null ? 
                        <i className="fi fi-rs-user"></i> :
                        <h1 data-testid="user_login">{username?.name.charAt(0)}</h1>
                    }
                    
                    <UserContainer
                        id="userActionsModal"
                        data-testid="user_container"
                        role="dialog"
                        className={showLogin ? "user--show" : ""}>
                        <HeaderLogin />
                    </UserContainer>
                </div>


                {
                    username!== null && (
                        <div
                            id="icon-bag"
                            data-testid="bag" 
                            className="icon-bag" 
                            aria-label="Ir al carrito"
                            onClick={()=>navigate(`/cart/${username?.id}`)}>
                            <i className="fi fi-rs-shopping-bag"></i>
                        </div>
                    )
                }
                
            </HeaderIcons>
        </HeaderBase>

    );
}
export default Header;