import React, { useEffect } from "react";
import { useAppSelector } from "../../../redux/store/store";
import { CompaniesGrid, InformationMsg, CompanyElement } from "./styles";
import { ASYNC_STATUS } from "../../../constants/asyncState";
import { getCompanyList } from "../../../redux/slices/dataSlice";
import { useDispatch } from "react-redux";
import { Circles } from "react-loader-spinner";
import Theme from "../../../theme";
const Companies = () => {
    const {companies,status} = useAppSelector(state=>state.data);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getCompanyList() as any);
    },[dispatch]);

    const errors = () => (
        <InformationMsg>
            <p>Error en la carga de datos</p>
        </InformationMsg>
    )
    const charging = () => (
        <InformationMsg>
            <div>
                <h3>Cargando...</h3>
            </div>
            <Circles
                height="80"
                width="80"
                color={Theme.colors.details}
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </InformationMsg>
        
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