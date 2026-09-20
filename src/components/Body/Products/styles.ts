import styled from "styled-components";
import { FlexboxStructure, PxToRem } from "../../../theme/styles";

const ProductData = styled.section`
    ${FlexboxStructure("column","center","center")};
    border-radius: 2rem;
    border: 1px solid ${props => props.theme.colors.marks};
    transition: all 0.25s ease-in-out;
    &:hover{
        transform: scale(1.05);
    }
`;



const ProductContainer = styled.div<{$hasDiscount:boolean}>`
    display:grid;
    grid-template-areas: 
    ${({ $hasDiscount}) =>
        $hasDiscount ? 
        `"imagen imagen"
        "nombre nombre"
        "precio descuento"
        "total total"` : 
        `"imagen"
        "nombre"
        "precio"`
    };
    justify-content: center;
    align-items: center;
    border-radius: 2rem;
    overflow: hidden;
`;

const ProductImagen = styled.div`
    grid-area: imagen;
    border-radius: 1rem;
    padding: 1rem;
    width: 100%;
    height: 560px;
    overflow: hidden;
    box-sizing: border-box;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: inherit;
        display: block;
    }


`;

const ProductTitle = styled.h3`
    grid-area: nombre;
    font-family: ${props=>props.theme.fonts.primary};
    font-size: ${PxToRem(24)};
    font-weight: 700;
    line-height: 1.1;
    margin-top: .75rem;
    margin-bottom: .25rem;
    text-align: center;
`;

const ProductPrice = styled.h4<{$isTotal:boolean}>`
    grid-area: ${({ $isTotal })=> !$isTotal ? `precio` : `total`};  
    font-size: ${({ $isTotal })=> !$isTotal ? `${PxToRem(20)}` : `${PxToRem(24)}`};;
    font-weight: ${({ $isTotal })=> !$isTotal ? `400` : `600`};
    line-height: 1.2;
    margin-top: .75rem;
    margin-bottom: .25rem;
    text-align:center;
    text-decoration: ${({ $isTotal}) => !$isTotal ? `line-through`:`none`};
    color:${({ $isTotal, theme })=> $isTotal ?
        `${ theme.colors.buttons }` : 
        `${ theme.colors.background }`}; 
`;

const ProductDiscount = styled.h4`
    grid-area: descuento;
    color: ${props=>props.theme.colors.marks};
    font-size: ${PxToRem(20)};
    font-weight: 600;
    line-height: 1.2;
    margin-top: .75rem;
    margin-bottom: .25rem;
    text-align:center;
`;

const ProductButton = styled.button`
    width: auto;
    background-color: ${props => props.theme.colors.marks};
    color: ${props => props.theme.colors.background};
    border: 1px solid ${props => props.theme.colors.marks};
    border-radius: 1.5rem;
    font-size: ${PxToRem(24)};
    font-weight: 500;
    line-height: 1.2;
    box-sizing: border-box;
    margin: .75rem 1rem;
    padding: 0.5rem;
    transition: ${p=>p.theme.buttons.transition};
    &:hover{
        transform: ${p=>p.theme.buttons.scale};
        filter: ${p=>p.theme.buttons.bright};
    }
`;

export {
    ProductData,
    ProductContainer,
    ProductImagen,
    ProductTitle,
    ProductPrice,
    ProductDiscount,
    ProductButton
}