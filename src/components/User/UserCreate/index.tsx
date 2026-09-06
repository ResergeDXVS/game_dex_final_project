import React, { useState, Fragment } from "react";
import {
  UserContainerForm,
  UserCreateTitle,
  UserFormButtonSubmit,
  UserFormFeedback,
  UserFormFieldset,
  UserFormInput,
  UserFormLabel,
  UserFormLine,
} from "../styles";
import { loginUser, postUser } from "../../../redux/slices/userSlice";
import { UserHeader, UserHeaderLogo } from "../../Header/HeaderMin/styles";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/store/store";
import Alert from "../../Alert";

export type FormState = {
  name: string;
  paternal_surname: string;
  maternal_surname: string;
  rfc: string;
  datebirth: string;
  email: string;
  password: string;
};

const UserCreate = () => {
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const dispatch = useAppDispatch();

    const [form, setForm] = useState<FormState>({
            name: "",
            paternal_surname: "",
            maternal_surname: "",
            rfc: "",
            datebirth: "",
            email: "",
            password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if( !form.name ||
            !form.paternal_surname ||
            !form.rfc ||
            !form.datebirth ||
            !form.email ||
            !form.password
        ){
            setSubmitted(true);
            return;
        }
        const user = {
            name: form.name,
            paternal_surname: form.paternal_surname,
            maternal_surname: form.maternal_surname,
            rfc: form.rfc,
            datebirth: form.datebirth,
            email: form.email,
            password: form.password,
        }
        dispatch(postUser(user) as any);
        //navigate("/");
    };

    return (
        <Fragment>
            <UserHeader
                onClick={()=>{navigate("/")}}
                aria-label="Ir a la pantalla principal">
                <UserHeaderLogo>
                <img src="/img/GAME-DEX-LOGO.png" alt="GAMES DEX" />
                <p>GAME DEX</p>
                </UserHeaderLogo>
            </UserHeader>

            <UserContainerForm onSubmit={handleSubmit}>
                <UserCreateTitle>Crea tu cuenta para comprar</UserCreateTitle>
                <UserFormFieldset>
                <UserFormLine>
                    <UserFormLabel htmlFor="name">Nombre(s)</UserFormLabel>
                    <UserFormInput
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    $invalid={submitted && !form.name}
                    $capitalize={true}
                    aria-label="Ingresa tus Nombres"
                    />
                    <UserFormFeedback
                    $invalid={submitted && !form.name}
                    $capitalize={null}
                    >
                    Ingresa tu nombre
                    </UserFormFeedback>
                </UserFormLine>

                <UserFormLine>
                    <UserFormLabel htmlFor="paternal_surname">Apellido Paterno</UserFormLabel>
                    <UserFormInput
                    id="paternal_surname"
                    name="paternal_surname"
                    type="text"
                    value={form.paternal_surname}
                    onChange={handleChange}
                    $invalid={submitted && !form.paternal_surname}
                    $capitalize={true}
                    aria-label="Ingresa tu apellido parterno"
                    />
                    <UserFormFeedback
                    $invalid={submitted && !form.paternal_surname}
                    $capitalize={null}
                    >
                    Ingresa tu apellido paterno
                    </UserFormFeedback>
                </UserFormLine>

                <UserFormLine>
                    <UserFormLabel htmlFor="maternal_surname">Apellido Materno</UserFormLabel>
                    <UserFormInput
                    id="maternal_surname"
                    name="maternal_surname"
                    type="text"
                    value={form.maternal_surname}
                    onChange={handleChange}
                    $invalid={null}
                    $capitalize={true}
                    aria-label="Ingresa tu apellido materno"
                    />
                </UserFormLine>

                <UserFormLine>
                    <UserFormLabel htmlFor="datebirth">Fecha de Nacimiento</UserFormLabel>
                    <UserFormInput
                    id="datebirth"
                    name="datebirth"
                    type="date"
                    value={form.datebirth}
                    onChange={handleChange}
                    $invalid={submitted && !form.datebirth}
                    $capitalize={true}
                    aria-label="Ingresa tu fecha de nacimiento DD/MM/AAAA"
                    />
                    <UserFormFeedback
                    $invalid={submitted && !form.datebirth}
                    $capitalize={null}
                    >
                    Debes ser mayor de 18 años
                    </UserFormFeedback>
                </UserFormLine>

                <UserFormLine>
                    <UserFormLabel htmlFor="rfc">RFC (Para aduana y facturación)</UserFormLabel>
                    <UserFormInput
                    id="rfc"
                    name="rfc"
                    type="text"
                    value={form.rfc}
                    onChange={handleChange}
                    $invalid={submitted && !form.rfc}
                    $capitalize={true}
                    aria-label="Ingresa tu RFC (para asuntos de aduana y facturación)"
                    />
                    <UserFormFeedback
                    $invalid={submitted && !form.rfc}
                    $capitalize={null}
                    >
                    Ingresa tu RFC válido
                    </UserFormFeedback>
                </UserFormLine>

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
                    aria-label="Ingresa tu correo electrónico"
                    />
                    <UserFormFeedback
                    $invalid={submitted && !form.email}
                    $capitalize={null}
                    >
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
                    aria-label="Ingresa tu contraseña para tu cuenta"
                    />
                    <UserFormFeedback
                    $invalid={submitted && !form.password}
                    $capitalize={null}
                    >
                    Ingresa una contraseña mínimo de 8 dígitos
                    </UserFormFeedback>
                </UserFormLine>

                <UserFormLine>
                    <UserFormButtonSubmit
                    id="submit"
                    type="submit"
                    value="Crear Cuenta"
                    aria-label="Enviar información para crear tu cuenta"
                    />
                </UserFormLine>
                </UserFormFieldset>
            </UserContainerForm>

            <Alert
                id="alert_product"
                title="Cuenta ya existente"
                message="El correo ya ha sido utilizado. Favor de ingresar."
                action={() => setShowAlert(false)}
                visible={showAlert}
            />
            </Fragment>
        );
    };

export default UserCreate;