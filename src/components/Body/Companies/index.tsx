import React, { useEffect } from "react";
import { useAppSelector } from "../../../redux/store/store";
import { CompaniesGrid, CompanyElement } from "./styles";
import { ASYNC_STATUS } from "../../../constants/asyncState";
import { getCompanyList } from "../../../redux/slices/dataSlice";
import { useDispatch } from "react-redux";
const Companies = () => {
    const {companies,status} = useAppSelector(state=>state.data);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getCompanyList() as any);
    },[dispatch]);

    const errors = () => (
        <p>Error en la búsqueda</p>
    )
    const charging = () => (
        <p>Cargando</p>
    )
    const structure = () => (
        <CompaniesGrid
            aria-label="Sección de compañias de videojuegos disponibles en tienda">
            {
                companies && (
                    companies.map(data => {
                        const { id,name,image_url } = data;
                        return(
                            <CompanyElement key={id}>
                                <img 
                                    src={image_url}
                                    alt={`Logo de la compañia ${name}`}/>
                            </CompanyElement>
                        );
                    })
                )
            }
        </CompaniesGrid>
    )
    
    const render = () => {
        if (status === ASYNC_STATUS.PENDING ){
            return charging();
        }else if(status === ASYNC_STATUS.REJECTED){
            return errors();
        }else{
            return structure();
        }
    }

    return render();
}
export default Companies;