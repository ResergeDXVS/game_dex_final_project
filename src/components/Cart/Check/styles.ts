import styled, { css } from "styled-components";
import { FlexboxStructure, mediaAdjustments, phoneAdjustments, PxToRem } from "../../../theme/styles";

const CheckContainer = styled.section`
    width: auto;

    ${FlexboxStructure("column","center","center")};
    font-family: ${props=>props.theme.fonts.primary};
    background: ${props=>props.theme.colors.background};
    gap: 1rem;
    padding: 2.5rem 3rem;
    

`;

const CheckErrorContainer = styled.section`
    width: auto;
    height:70vh;
    ${FlexboxStructure("column","center","center")};
    font-family: ${props=>props.theme.fonts.primary};
    background: ${props=>props.theme.colors.white};
    gap: 1rem;
    padding: 4rem 3rem;
`;

const CheckDecoration = styled.section`
    ${FlexboxStructure("column","space-between","center")};
    width: auto;
    background-color: ${props=>props.theme.colors.white};
    border: 2px solid ${props=>props.theme.colors.background};
    padding: 2rem;
    clip-path: polygon(
        
        0 0, 5% 5%, 10% 0, 15% 5%, 20% 0, 25% 5%, 30% 0, 35% 5%, 
        40% 0, 45% 5%, 50% 0, 55% 5%, 60% 0, 65% 5%, 70% 0, 75% 5%, 
        80% 0, 85% 5%, 90% 0, 95% 5%, 100% 0,
        
        100% 95%,
        
        95% 100%, 90% 95%, 85% 100%, 80% 95%, 75% 100%, 70% 95%, 
        65% 100%, 60% 95%, 55% 100%, 50% 95%, 45% 100%, 40% 95%, 
        35% 100%, 30% 95%, 25% 100%, 20% 95%, 15% 100%, 10% 95%, 
        5% 100%, 0 95%,
        
        0 0
    );
    padding: 4rem 2rem;
    font-family: ${props=>props.theme.fonts.primary};
`;


const CheckTitle = styled.h1`
    font-size: ${PxToRem(36)};
    font-weight: 700;
    font-family: inherit;
    color:${props=>props.theme.colors.background};
    width: 100%;
    padding-top:3rem;
    padding-bottom: 2rem;
    border-bottom: 4px dotted ${props=>props.theme.colors.background};
    text-transform: uppercase;
    text-align: center;
    margin: 0;
    ${mediaAdjustments(css`
        font-size: ${PxToRem(32)};
    `)};
    ${phoneAdjustments(css`
        font-size: ${PxToRem(28)};
    `)};
`;

const CheckSubTitle = styled.h2`
    font-size: ${PxToRem(28)};
    font-weight: 500;
    font-family: ${props=>props.theme.fonts.secondary};
    color:${props=>props.theme.colors.background};
    width: 100%;
    padding-top:1.5rem;
    padding-bottom: 2rem;
    border-bottom: 2px dotted ${props=>props.theme.colors.background};
    text-transform: uppercase;
    text-align: center;
    margin: 0;
    ${mediaAdjustments(css`
        font-size: ${PxToRem(24)};
    `)};
    ${phoneAdjustments(css`
        font-size: ${PxToRem(20)};
    `)};
`;

const CheckAddress = styled.h3`
    font-size: ${PxToRem(20)};
    font-weight: 400;
    font-family: ${props=>props.theme.fonts.secondary};
    color:${props=>props.theme.colors.background};
    width: 100%;
    padding-top:1.5rem;
    padding-bottom: 2rem;
    border-bottom: 2px dotted ${props=>props.theme.colors.background};
    text-transform: uppercase;
    text-align: center;
    margin: 0;
    ${mediaAdjustments(css`
        font-size: ${PxToRem(16)};
    `)};
    ${phoneAdjustments(css`
        font-size: ${PxToRem(16)};
    `)};
`;

const CheckMethod = styled.h3`
    font-size: ${PxToRem(20)};
    font-weight: 400;
    font-family: ${props=>props.theme.fonts.secondary};
    color:${props=>props.theme.colors.background};
    width: 100%;
    padding-top:1.5rem;
    padding-bottom: 2rem;
    border-bottom: 2px dotted ${props=>props.theme.colors.background};
    text-transform: uppercase;
    text-align: center;
    margin: 0;
    ${mediaAdjustments(css`
        font-size: ${PxToRem(16)};
    `)};
    ${phoneAdjustments(css`
        font-size: ${PxToRem(16)};
    `)};
`;

const CheckItems = styled.section`
    ${FlexboxStructure("column","center","center")};
    gap:0.5rem;
    padding: 1rem 3rem;
    border-bottom: 1px dotted ${props=>props.theme.colors.background};
    width:100%;
`;

const CheckProduct = styled.section`

    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: auto;
    box-sizing: border-box;
    justify-content: space-around;
    align-items: center;
    grid-template-areas: 
    "number title price discount total";
    gap:.5rem;
    width: 100%;
    padding: .75rem;


    ${mediaAdjustments(css`
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(2,auto);
        grid-template-areas: 
        "number title title total"
        "number price discount total";
    `)};
    ${phoneAdjustments(css`
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(2,auto);
        grid-template-areas: 
        "number title title title"
        "number price discount total";
    `)};
`;


const CheckProductName = styled.p`
    width: 100%;
    font-family: inherit;
    grid-area: title;
    color: ${props=> props.theme.colors.details};
    margin: 0;
    text-align: center;
    flex-grow: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: ${PxToRem(24)};
    ${mediaAdjustments(css`
        font-size: ${PxToRem(20)};
        text-align: left;
    `)};
    ${phoneAdjustments(css`
        font-size: ${PxToRem(20)};
        text-align: left;
    `)};
`;

const CheckProductOriginalPrice = styled.p`
    width: 100%;
    font-family: ${props=>props.theme.fonts.secondary};
    grid-area: price;
    color:${props=> props.theme.colors.details};
    margin:0;
    text-align: center;
    font-size: ${PxToRem(24)};
    ${mediaAdjustments(css`
        font-size: ${PxToRem(20)};
        text-align: left;
    `)};
    ${phoneAdjustments(css`
        font-size: ${PxToRem(20)};
        text-align: left;
    `)};
`;

const CheckProductDiscount = styled.p`
    width: 100%;
    font-family: ${props=>props.theme.fonts.secondary};
    grid-area: discount;
    color:${props=> props.theme.colors.marks};
    margin:0;
    text-align: start;
    font-size: ${PxToRem(24)};
    ${mediaAdjustments(css`
        font-size: ${PxToRem(20)};
    `)};
    ${phoneAdjustments(css`
        font-size: ${PxToRem(20)};
    `)};
    
`;

const CheckProductNumber = styled.p`
    width: 100%;
    font-family: ${props=>props.theme.fonts.secondary};
    grid-area: number;
    color:${props=> props.theme.colors.marks};
    margin:0;
    text-align: start;
    font-size: ${PxToRem(24)};
    ${mediaAdjustments(css`
        text-align: right;
        padding-right: 2rem;
    `)};
    ${phoneAdjustments(css`
        text-align: right;
        padding-right: 2rem;
    `)};
`;

const CheckProductTotal = styled.p`
    grid-area: total;
    font-family: ${props=>props.theme.fonts.secondary};
    color:${props=> props.theme.colors.buttons};
    margin:0;
    text-align: right;
    font-weight: 900;
    padding-right: 2rem;
    font-size: ${PxToRem(24)};
    ${mediaAdjustments(css`
        font-size: ${PxToRem(20)};
    `)};
    ${phoneAdjustments(css`
        font-size: ${PxToRem(20)};
    `)};
    
`;



const CheckPayment = styled.div`
    width: auto;
    box-sizing: border-box;
    padding-top: 2rem;
    padding-bottom:3.5rem;
    button{
        width: auto;
        color:${props=> props.theme.colors.background};
        border: 1px solid ${props=> props.theme.colors.marks};
        background-color:${props=> props.theme.colors.marks};
        box-sizing: border-box;
        font-size: ${PxToRem(28)};
        padding: 0.75rem 2rem;
        transition: ${p=>p.theme.buttons.transition};
        cursor: pointer;
        &:hover{
            transform: ${p=>p.theme.buttons.scale};
            filter: ${p=>p.theme.buttons.bright};
        }
    }
`;

export {
    CheckContainer,
    CheckErrorContainer,
    CheckDecoration,
    CheckTitle,
    CheckItems,
    CheckProduct,
    CheckSubTitle,
    CheckProductName,
    CheckProductOriginalPrice,
    CheckProductDiscount,
    CheckProductNumber,
    CheckProductTotal,
    CheckPayment,
    CheckAddress,
    CheckMethod
}