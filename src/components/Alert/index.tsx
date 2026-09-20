import React from "react";
import { AlertButton, AlertContainer, AlertMessage, AlertTitle } from "./styles";

type AlertProps = {
    id:string,
    title:string,
    message:string,
    action: () => void;
    visible: boolean;

}


const Alert = ({id,title,message,action,visible}:AlertProps) => {
    if (!visible) return null;

    return(
        <AlertContainer 
            id={id} 
            className="alert alert--show"
            aria-labelledby="alertModalTitle">
            <AlertTitle
                id="alertModalTitle">
                {title}
            </AlertTitle>
            <AlertMessage>
                {message}
            </AlertMessage>
            <AlertButton
                data-testid="alert_button"
                aria-label="Botón para cerrar la ventana de alerta"
                onClick={action}>
                Entendido
            </AlertButton>
        </AlertContainer>
    );
}

export default Alert;