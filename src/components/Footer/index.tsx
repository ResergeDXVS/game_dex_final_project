import React from "react";
import { FooterContacts, FooterCopyrights, FooterNetworks, FooterInfo, FooterStructure, FooterTitles } from "./styles";
import '@flaticon/flaticon-uicons/css/all/all.css';

const Footer = () => {
    return (
        <FooterStructure>
            <FooterInfo>
                <FooterTitles>Adicional</FooterTitles>
                <div>
                    <button 
                        aria-label="Ir a la sección de Sobre Nosotros"
                        type="button">
                            Sobre Nosotros
                    </button>
                    <button 
                        aria-label="Ir a la sección de Facturación"
                        type="button">
                            Facturación
                    </button>
                    <button 
                        aria-label="Ir a la sección de Sucursales"
                        type="button">
                            Sucursales
                    </button>
                    <button 
                        aria-label="Ir a la sección de Terminos y condiciones"
                        type="button">
                            Terminos y condiciones
                    </button>
                </div>
            </FooterInfo>
            <FooterNetworks>
                <FooterTitles>Redes</FooterTitles>
                <div>
                    <button 
                        type="button"
                        aria-label="Ir a la página de Facebook">
                        <i className="fi fi-brands-facebook"/>
                    </button>
                    <button 
                        type="button"
                        aria-label="Ir a la página de Instagram">
                        <i className="fi fi-brands-instagram"/>
                    </button>
                    <button 
                        type="button"
                        aria-label="Ir a la página de Twitter">
                        <i className="fi fi-brands-twitter-alt"/>
                    </button>
                </div>
            </FooterNetworks>
            <FooterContacts>
                <FooterTitles>Contactos</FooterTitles>
                <div>
                    <p>Contacto: 
                        <a href="gamedexoficial@gdmail.com">gamedexoficial@gdmail.com</a>
                    </p>
                    <p>Whatsapp: 
                        <a href="tel:+525555555555">+52 55 5555 5555</a>
                    </p>
                </div>
                
            </FooterContacts>
            <FooterCopyrights
                aria-label="Sección de Copyright">
                <p>
                    &copy; 2026 GameDex. Todos los derechos reservados.
                </p>
                <p>
                    Este sitio web y su contenido, incluyendo logotipos, imágenes, textos y diseños, están protegidos por las leyes de propiedad.
                </p>
                <p>
                    Página realizada por <a href="https://github.com/ResergeDXVS">Sergio Reza</a>
                </p>
            </FooterCopyrights>
        </FooterStructure>
    );
}

export default Footer;