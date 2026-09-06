import React, { Fragment, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/store/store";
import { AddressMethodState } from "..";
//import { createAddressThunk } from "../../../../redux/slices/addresssSlice";
import { AddressAddButton, AddressCancel, AddressDiv, AddressFormBase, AdressStructureForm } from "./styles";
import { GetAddresses, PostAddresses } from "../../../../redux/slices/addresssSlice";

type AddressMethodProps = {
    visible: boolean;
    onClose: ()=>void;
    onAlert: ()=>void;
};



const AddressForm = ({ visible,onClose,onAlert }: AddressMethodProps) => {
    
    const dispatch = useAppDispatch();
    const actualUser = useAppSelector(state=>state.user.actualUser);
    const [form, setForm] = useState<AddressMethodState>({
        address:"",
        internal_number:"",
        external_number:"",
        postal:"",
        suburb:"",
        country:"",
    });
    

    const clearAndClose = () => {
        setForm({
            address:"",
            internal_number:"",
            external_number:"",
            postal:"",
            suburb:"",
            country:"",
        })
        onClose();
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let newValue = value;

        setForm((prev) => ({ ...prev, [name]: newValue }));
    };

    const checkData = (type:string, data:string) => {
        const regexNumber = /^\d{5}$/;
        if (data==="") return null;
        if(type==="postal"){    
            if (!regexNumber.test(data)) return false;
            else return true;
        }else {
            if(data!== "") return null;
            else return true
        }
    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const storedUser = actualUser;
        const token = storedUser?.access ?? "";
        const address = {
            address:form.address,
            internal_number:form.internal_number,
            external_number:form.external_number,
            postal:form.postal,
            suburb:form.suburb,
            country:form.country,
        };
        const result = await dispatch(PostAddresses(address as any));
        dispatch(GetAddresses(token) as any);
        console.log(result);
        if ((PostAddresses.fulfilled as any).match(result)) {
            onClose();
        } else if ((PostAddresses.rejected as any).match(result)) {
            onAlert();
        }
    };
    


    return (
        <Fragment>
            <AddressFormBase 
                id="addressAddModal"
                role="dialog"
                data-testid="form_address"
                className={ visible ? `form--show`:``}>
                <AddressCancel
                    data-testid="form_address_cancel"
                    onClick={()=>clearAndClose()}>
                    <i className="fi fi-rs-x"></i>
                </AddressCancel>
                <AdressStructureForm onSubmit={handleSubmit}>
                    <AddressDiv
                        $grid_name="direccion"
                        $show_data={checkData("direccion",form.address)}>
                        <label htmlFor="address">Calle</label>
                        <input
                            id="address"
                            name="address"
                            type="text"
                            value={form.address}
                            onChange={handleChange}
                            aria-label="Agregar nombre de la calle"
                        />
                        <p>Favor de agregar una calle</p>
                    </AddressDiv>
                    <AddressDiv
                        $grid_name="externo"
                        $show_data={checkData("externo",form.external_number)}>
                        <label htmlFor="external_number">Número exterior</label>
                        <input
                            id="external_number"
                            name="external_number"
                            type="text"
                            value={form.external_number}
                            onChange={handleChange}
                            aria-label="Agregar número exterior de la calle"
                        />
                        <p>Favor de agregar un número exterior</p>
                    </AddressDiv>
                    <AddressDiv
                        $grid_name="interno"
                        $show_data={null}>
                        <label htmlFor="internal_number">Número Interno</label>
                        <input
                            id="internal_number"
                            name="internal_number"
                            type="text"
                            value={form.internal_number}
                            onChange={handleChange}
                            aria-label="Agregar número interior de la calle"
                        />
                        
                    </AddressDiv>
                    <AddressDiv
                        $grid_name="postal"
                        $show_data={checkData("postal",form.postal)}>
                        <label htmlFor="postal">Código Postal</label>
                        <input
                            id="postal"
                            name="postal"
                            type="text"
                            value={form.postal}
                            maxLength={5}
                            onChange={handleChange}
                            aria-label="Agregar código postal (5 dígitos)"
                        />
                        <p>Favor de agregar código postal válido</p>
                    </AddressDiv>
                    <AddressDiv
                        $grid_name="colonia"
                        $show_data={checkData("colonia",form.suburb)}>
                        <label htmlFor="suburb">Colonia</label>
                        <input
                            id="suburb"
                            name="suburb"
                            type="text"
                            value={form.suburb}
                            onChange={handleChange}
                            aria-label="Agregar nombre de la colonia"
                        />
                        <p>Favor de agregar la colonia</p>
                    </AddressDiv>
                    <AddressDiv
                        $grid_name="pais"
                        $show_data={checkData("pais",form.country)}>
                        <label htmlFor="country">Pais</label>
                        <input
                            id="country"
                            name="country"
                            type="text"
                            value={form.country}
                            onChange={handleChange}
                            aria-label="Agregar nombre del país"
                        />
                        <p>Favor de agregar el país</p>
                    </AddressDiv>

                    <AddressAddButton 
                        data-testid="form_address_submit"
                        type="submit"
                        aria-label="Agregar dirección para envio">
                        <i className="fi fi-rs-plus"></i>
                        <p>Agregar</p>
                    </AddressAddButton>
                </AdressStructureForm>
            </AddressFormBase>
            
        </Fragment>
    );
};

export default AddressForm;