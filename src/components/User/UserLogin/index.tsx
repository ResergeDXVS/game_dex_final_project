import React, { useState } from "react";
import { Fragment } from "react";
import { UserContainerForm, UserCreateTitle, UserFormButtonSubmit, UserFormFeedback, UserFormFieldset, UserFormInput, UserFormLabel, UserFormLine } from "../styles";

import { UserHeader, UserHeaderLogo } from "../../Header/HeaderMin/styles";
import { useNavigate } from "react-router-dom";
import Alert from "../../Alert";
import { useAppDispatch } from "../../../redux/store/store";
import { loginUser } from "../../../redux/slices/userSlice";

export type LoginState = {
    email: string,
    password: string,
};

const UserLogin = () => {
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState<boolean|null>(null);
    const dispatch = useAppDispatch();
    const [form, setForm] = useState<LoginState>({
        email:"",
        password:"",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!form.email || !form.password) {
            setSubmitted(true);
            return;
        }
        const user = {
            email: form.email,
            password: form.password
        }
        dispatch(loginUser(user) as any);
        navigate("/");
    };

    
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
            <UserContainerForm onSubmit={handleSubmit}>
                <UserCreateTitle>Ingresa a tu cuenta</UserCreateTitle>
                <UserFormFieldset>
                    <UserFormLine>
                        <UserFormLabel htmlFor="email">Correo Electrónico</UserFormLabel>
                        <UserFormInput
                            id="email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            $invalid={submitted && !form.email}
                            $capitalize={false}
                            aria-label="Ingresa tu correo electrónico"/>
                        <UserFormFeedback
                            $invalid={submitted && !form.email}
                            $capitalize={null}>
                            Ingresa un correo válido
                        </UserFormFeedback>
                    </UserFormLine>
                    <UserFormLine>
                        <UserFormLabel htmlFor="password">Contraseña</UserFormLabel>
                        <UserFormInput
                            id="password"
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={handleChange}
                            $invalid={submitted && !form.password}
                            $capitalize={false}
                            aria-label="Ingresa tu contraseña"/>
                        <UserFormFeedback
                            $invalid={submitted && !form.password}
                            $capitalize={null}>
                            Ingresa una contraseña minimo de 8 dígitos
                        </UserFormFeedback>
                    </UserFormLine>
                    <UserFormLine>
                        <UserFormButtonSubmit 
                            id="submit"
                            type="submit"
                            aria-label="Envar datos para acceder a tu cuenta."
                            value="Ingresar"/>
                    </UserFormLine>
                </UserFormFieldset>
            </UserContainerForm>
            <Alert
                id="alert_product"
                title={"Cuenta o contraseña incorrecta"} 
                message={"Favor de revisar la información de la cuenta."}
                action={() => setShowAlert(false)}
                visible={showAlert}/>
        </Fragment>
    );
}
export default UserLogin;