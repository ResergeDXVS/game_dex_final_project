import styled, { css } from "styled-components";
import { FlexboxStructure, mediaAdjustments, phoneAdjustments, PxToRem } from "../../theme/styles";

const CartContainer = styled.section`
    width: auto;
    height: auto;
    ${FlexboxStructure("column","center","center")};
    font-family: ${props=>props.theme.fonts.primary};
    background: linear-gradient(
        165deg, 
        ${props=>props.theme.colors.background} 50%, 
        ${props=>props.theme.colors.white} 50%);
    gap: 1rem;
    padding: 1.75rem 4.75rem;
    

`;

const CartDecorationError = styled.section`
    ${FlexboxStructure("column","center","stretch")};
    width: 100%;
    min-height: 60vh;
    background-color: ${props=>props.theme.colors.white};
    padding: 2rem;
`;

const CartDecoration = styled.section`
    ${FlexboxStructure("column","space-between","center")};
    width: 100%;
    min-height: 60vh;
    border-radius: 1.5rem;
    background-color: ${props=>props.theme.colors.white};
    border: 2px solid ${p=>p.theme.colors.background};
    padding: 2rem;
    font-family: ${props=>props.theme.fonts.primary};
`;

const CartTitle = styled.h1`
    font-size: ${PxToRem(42)};
    font-weight: 700;
    font-family: inherit;
    color:${props=>props.theme.colors.buttons};
    width: auto;
    margin: 1rem 3rem .75rem 3rem;
    border-bottom: 1px solid ${props=>props.theme.colors.white};
    text-transform: uppercase;
    text-align: center;
    ${mediaAdjustments(css`
        font-size: ${PxToRem(36)};
    `)};
    ${phoneAdjustments(css`
        font-size: ${PxToRem(28)};
    `)};
`;

const CartItems = styled.section`
    ${FlexboxStructure("row","center","center")};
    gap:2rem;
    margin: 1rem 3rem;
    padding: 0.5rem;

`;

const CartProduct = styled.section`
    border:1px solid ${props => props.theme.colors.gray};
    border-radius: .5rem;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 0.5fr 1fr 0.5fr;
    grid-template-rows: repeat(2,1fr);
    box-sizing: border-box;
    justify-content: space-around;
    align-items: center;
    grid-template-areas: 
    "imagen title title title total delete"
    "imagen price discount number total delete";
    gap:.75rem;
    width: 100%;
    padding: .75rem;
    height: 200px;
    ${mediaAdjustments(css`
        grid-template-columns: 1fr 1fr 1fr 1fr 0.5fr;
        grid-template-rows: repeat(3,1fr);
        grid-template-areas: 
        "imagen title title total delete"
        "imagen price discount total delete"
        "imagen number number total delete";
    `)};
    ${phoneAdjustments(css`
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-template-rows: repeat(4,1fr);
        grid-template-areas: 
        "imagen title title delete"
        "imagen price discount delete"
        "imagen number number delete"
        "imagen total total delete";
    `)};
`;

const CartProductImage = styled.img`
    grid-area: imagen;
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 0.375rem;
    margin: auto;
    ${phoneAdjustments(css`
        width:100px;
        height:100px;
    `)};
`;

const CartProductName = styled.p`
    width: 100%;
    font-family: inherit;
    grid-area: title;
    color: ${props=> props.theme.colors.details};
    margin: 0;
    text-align: left;
    flex-grow: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: ${PxToRem(28)};
    font-weight: 700;
    margin-left:.75rem;
    ${mediaAdjustments(css`
        font-size: ${PxToRem(24)};
        margin-left:.25rem;
    `)};
    ${phoneAdjustments(css`
        font-size: ${PxToRem(20)};
        margin-left:.25rem;
    `)};
`;

const CartProductOriginalPrice = styled.p`
    width: 100%;
    font-family: ${props=>props.theme.fonts.secondary};
    grid-area: price;
    color:${props=> props.theme.colors.details};
    margin:0;
    text-align: center;
    font-size: ${PxToRem(28)};
    margin-left:.75rem;
    ${mediaAdjustments(css`
        text-align: left;
        font-size: ${PxToRem(24)};
    `)};
    ${phoneAdjustments(css`
        text-align: left;
        font-size: ${PxToRem(20)};
    `)};
`;

const CartProductDiscount = styled.p`
    width: 100%;
    font-family: ${props=>props.theme.fonts.secondary};
    grid-area: discount;
    color:${props=> props.theme.colors.buttons};
    margin:0;
    text-align: start;
    font-size: ${PxToRem(28)};
    ${mediaAdjustments(css`
        text-align: right;
        font-size: ${PxToRem(24)};
    `)};
    ${phoneAdjustments(css`
        text-align: right;
        font-size: ${PxToRem(20)};
    `)};
`;

const CartProductNumber = styled.input`
    grid-area: number;
    font-family: ${props=>props.theme.fonts.secondary};
    color: ${props=> props.theme.colors.background};
    text-align: center;
    width: 100%;
    margin: 0px 8px;
    padding: 0.5rem;
    background-color: ${props=> props.theme.colors.white};
    border: 2px solid ${props=> props.theme.colors.background};
    border-radius: .5rem;
    font-size: ${PxToRem(24)};
    font-weight: 700;
    ${mediaAdjustments(css`
        width: auto;
        margin: 0px 8px;
        padding: 0.5rem;
        align-self: center;
        font-size: ${PxToRem(22)};
    `)};
    ${phoneAdjustments(css`
        width:auto;
        margin: 0px 4px;
        padding: 0.25rem;
        align-self: center;
        font-size: ${PxToRem(20)};
    `)};
`;

const CartProductTotal = styled.p`
    grid-area: total;
    font-family: ${props=>props.theme.fonts.secondary};
    color:${props=> props.theme.colors.buttons};
    margin:0;
    text-align: right;
    font-weight: 700;
    font-size: ${PxToRem(32)};
    ${mediaAdjustments(css`
        text-align: right;
        font-size: ${PxToRem(28)};
    `)};
    ${phoneAdjustments(css`
        text-align: center;
        font-size: ${PxToRem(24)};
    `)};
`;

const CartDeleteButton = styled.i`
    grid-area:delete;
    cursor: pointer;
    color: ${props=> props.theme.colors.buttons};
    font-size: ${PxToRem(36)};
    line-height: 1;
    text-align: center;
    display: inline-block;
    overflow: hidden;
`;

const CartPayment = styled.div`
    ${FlexboxStructure("column","center","center")};
    width: 100%;
    margin: 2rem;
    box-sizing: border-box;
    button{
        width: 50%;
        color:${props=> props.theme.colors.background};
        border: 1px solid ${props=> props.theme.colors.marks};
        background-color:${props=> props.theme.colors.marks};
        box-sizing: border-box;
        font-size: ${PxToRem(32)};
        padding: .75rem;
        border-radius: .75rem;
        font-weight: 700;
        ${mediaAdjustments(css`
            font-size: ${PxToRem(28)};
            padding: .5rem;
        `)};
        ${phoneAdjustments(css`
            font-size: ${PxToRem(24)};
            padding: .5rem;
        `)};
        
    }
`;

export {
    CartContainer,
    CartDecoration,
    CartTitle,
    CartItems,
    CartProduct,
    CartProductImage,
    CartProductName,
    CartProductOriginalPrice,
    CartProductDiscount,
    CartProductNumber,
    CartProductTotal,
    CartDeleteButton,
    CartPayment,
    CartDecorationError
}