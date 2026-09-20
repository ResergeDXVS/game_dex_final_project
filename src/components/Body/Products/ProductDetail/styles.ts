import styled, { css } from "styled-components";
import { FlexboxStructure, mediaAdjustments, phoneAdjustments, PxToRem } from "../../../../theme/styles";


const TitlesDetails = styled.h1`
    margin: 2rem 6rem 0.75rem 6rem;
    font-size: ${PxToRem(40)};
    color: ${props=> props.theme.colors.background};
    line-height: 1.2;
    font-weight: 700;
    font-family: ${props => props.theme.fonts.primary};
    text-align: center;
    ${mediaAdjustments(css`
        font-size: ${PxToRem(36)};
    `)};
    ${phoneAdjustments(css`
        font-size: ${PxToRem(32)};
    `)};
`;


const ProductDetailContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: repeat(5,1fr);
    grid-template-areas: 
        "imagen nombre nombre"
        "imagen precio descuento"
        "imagen total total"
        "imagen descripcion descripcion"
        "imagen boton boton";
    justify-content: center;
    align-items: center;
    width: auto;
    margin: 2rem 6rem;
    padding: 1.5rem 4rem;
    border: 1px solid ${props=>props.theme.colors.gray};
    border-radius: 2rem;
    gap:0.75rem;
    ${mediaAdjustments(css`
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: repeat(5,auto);
        grid-template-areas: 
            "imagen nombre nombre"
            "imagen precio descuento"
            "imagen total total"
            "imagen descripcion descripcion"
            "imagen boton boton";
    `)};
    ${phoneAdjustments(css`
        grid-template-columns: 1fr 1fr;
        grid-template-rows: repeat(5,auto);
        grid-template-areas: 
            "imagen imagen"
            "nombre nombre"
            "precio descuento"
            "total total"
            "descripcion descripcion"
            "boton boton";
        margin: 1rem 2.5rem;
        padding: 1.75rem;
    `)};
`;

const ProductDetailImagen = styled.div`
    grid-area: imagen;
    aspect-ratio: 4/3;
    border-radius: 0.5rem;
    img{
        width: 100%;
        min-width: 260px;
        height: 100%;
        object-fit: contain;
        border-radius: inherit;
    }
`;

const ProductDetailTitle = styled.div`
    grid-area: nombre;
    ${FlexboxStructure("column","center","flex-start")};
    margin-top: .75rem;
    margin-bottom: .25rem;
    line-height: 1.2;
    font-size: ${PxToRem(32)};
    ${mediaAdjustments(css`
        font-size: ${PxToRem(28)};
    `)};
    ${phoneAdjustments(css`
        font-size: ${PxToRem(24)};
    `)};
    h2{
        color: ${props=>props.theme.colors.details};
        font-family: ${props => props.theme.fonts.primary};
        font-size: inherit;
        font-weight: 700;
        line-height: inherit;
    }
    p{
        color: ${props=> props.theme.colors.background};
        font-family: ${props => props.theme.fonts.secondary};
        font-size: inherit;
        font-weight: 500;
        line-height: inherit;
    }
    
`;

const ProductDetailDescription = styled.div`
    grid-area: descripcion;
    ${FlexboxStructure("column","center","flex-start")};
    line-height: 1.2;
    margin-top: .75rem;
    margin-bottom: .25rem;
    font-size: ${PxToRem(28)};
    ${mediaAdjustments(css`
        font-size: ${PxToRem(24)};
    `)};
    ${phoneAdjustments(css`
        font-size: ${PxToRem(20)};
    `)};
    h3{
        color: ${props=>props.theme.colors.details};
        font-family: ${props => props.theme.fonts.primary};
        font-size: inherit;
        font-weight: 700;
        line-height: inherit;
    }
    p{
        color: ${props=> props.theme.colors.background};
        font-family: ${props => props.theme.fonts.secondary};
        font-size: inherit;
        font-weight: 400;
        line-height: inherit;
        text-align: justify;
    }
    
`;


const ProductDetailPrice = styled.div<{$isTotal:boolean,$area:string}>`
    grid-area: ${({ $area })=> $area==="precio" ? `precio` : `total`};
    ${FlexboxStructure("row","flex-start","flex-start")};
    gap: 1rem;
    margin-top: .75rem;
    margin-bottom: .25rem;
    line-height: 1.2;
    font-size: ${PxToRem(24)};
    ${mediaAdjustments(css`
        font-size: ${PxToRem(20)};
    `)};
    ${phoneAdjustments(css`
        font-size: ${PxToRem(16)};
    `)};
    h3{
        color: ${props=>props.theme.colors.details};
        font-family: ${props => props.theme.fonts.primary};
        font-size: inherit;
        font-weight: 700;
        line-height: inherit;
    }
    p{
        color: ${props=> props.theme.colors.background};
        font-family: ${props => props.theme.fonts.secondary};
        font-size: inherit;
        font-weight: 400;
        line-height: inherit;
        text-align: justify;
        text-decoration:${({ $isTotal }) => $isTotal ? `line-through`:`none`};
    }
`;

const ProductDetailDiscount = styled.div`
    grid-area: descuento;
    ${FlexboxStructure("row","flex-start","flex-start")};
    gap: 0.2rem;
    margin-top: .75rem;
    margin-bottom: .25rem;
    line-height: 1.2;
    font-size: ${PxToRem(24)};
    ${mediaAdjustments(css`
        font-size: ${PxToRem(20)};
    `)};
    ${phoneAdjustments(css`
        font-size: ${PxToRem(16)};
    `)};
    h4{
        color: ${props=>props.theme.colors.marks};
        font-family: ${props => props.theme.fonts.primary};
        font-size: inherit;
        font-weight: 700;
        line-height: inherit;
    }
    p{
        color: ${props=> props.theme.colors.marks};
        font-family: ${props => props.theme.fonts.secondary};
        font-size: inherit;
        font-weight: 500;
        line-height: inherit;
        text-align: justify;
        
    }
`;





const ProductDetailButton = styled.button`
    grid-area: boton;
    background-color: ${props => props.theme.colors.marks};
    color: ${props => props.theme.colors.background};
    border: 1px solid ${props => props.theme.colors.marks};
    border-radius: 1.5rem;
    width: auto;
    font-size: ${PxToRem(28)};
    font-weight: 500;
    line-height: 1.2;
    margin: .75rem 2rem .25rem 2rem;
    padding: .5rem;
    transition: ${p=>p.theme.buttons.transition};
    &:hover{
        transform: ${p=>p.theme.buttons.scale};
        filter: ${p=>p.theme.buttons.bright};
    }
    
    ${mediaAdjustments(css`
        font-size: ${PxToRem(24)};
        

    `)};
    ${phoneAdjustments(css`
        font-size: ${PxToRem(20)};
        
    `)};
    
`;

export {
    ProductDetailContainer,
    ProductDetailImagen,
    ProductDetailTitle,
    ProductDetailPrice,
    ProductDetailDiscount,
    ProductDetailDescription,
    ProductDetailButton,
    TitlesDetails
}