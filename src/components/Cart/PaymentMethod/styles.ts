import styled, { css } from "styled-components";
import { FlexboxStructure, mediaAdjustments, phoneAdjustments, PxToRem } from "../../../theme/styles";

const PaymentMethodDecoration = styled.section`
    ${FlexboxStructure("column","center","center")};
    width: auto;
    min-height: 60vh;
    border-radius: 1.5rem;
    border: 2px solid ${p=>p.theme.colors.background};
    background-color: ${p=>p.theme.colors.white};
    padding: 6rem;
    ${mediaAdjustments(css`
        padding: 4rem;
    `)};
    ${phoneAdjustments(css`
        padding: 2rem;
    `)};
`;

const PaymentMethodTitle = styled.h1`
    width: 100%;
    margin: 2rem 3rem;
    font-size: ${PxToRem(42)};
    font-weight: 700;
    font-family: inherit;
    color:${props=>props.theme.colors.buttons};
    border-bottom: 1px solid ${props=>props.theme.colors.gray};
    text-transform: uppercase;
    text-align: center;
    ${mediaAdjustments(css`
        font-size: ${PxToRem(36)};
        margin: 1rem 1.5rem;
    `)};
    ${phoneAdjustments(css`
        font-size: ${PxToRem(32)};
        margin: 1rem 1.5rem;
    `)};
`;

const PaymentMethodForm = styled.form`
    width: 100%;
    border: 2px solid ${p=>p.theme.colors.gray};
    margin: 2rem 0;
`;

const PaymentMethodDiv = styled.div`
    ${FlexboxStructure("row","center","center")};
    padding: .75rem 3rem;
    gap:2rem;
    font-size: ${PxToRem(28)};
    ${mediaAdjustments(css`
        font-size: ${PxToRem(24)};
    `)};
    ${phoneAdjustments(css`
        font-size: ${PxToRem(20)};
    `)};
`;

const PaymentMethodInput = styled.input`
    width: auto;
    font-size: inherit;
    margin: 0;
    cursor: pointer;
`;

const PaymentMethodLabel = styled.label`
    width: auto;
    margin: 0;
    line-height: 1;
    font-size: inherit;
    padding: 1rem;
    
    
`;

const PaymentMethodAddButton = styled.div`
    ${FlexboxStructure("row","center","center")};
    color: ${p=>p.theme.colors.details};
    background-color: ${p=>p.theme.colors.white};
    border:1px solid ${p=>p.theme.colors.gray};
    padding: .75rem;
    width: 100%;
    font-size: ${PxToRem(28)};
    gap: 0.75rem;
    &:hover{
        cursor: pointer;
    }
    ${mediaAdjustments(css`
        font-size: ${PxToRem(24)};
    `)};
    ${phoneAdjustments(css`
        font-size: ${PxToRem(20)};
    `)};
    i{
        font-size: inherit;  
        display: flex;
        justify-content: center;
        text-align: center;
        line-height: 1;
    }
    p{
        font-size: inherit;     
        text-align: center;
        line-height: 1;
        margin: 0;
    }
`;

const PaymentMethodPayment = styled.div`
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
        `)};
        ${phoneAdjustments(css`
            font-size: ${PxToRem(24)};
        `)};
    }
`;

export {
    PaymentMethodDecoration,
    PaymentMethodTitle,
    PaymentMethodForm,
    PaymentMethodInput,
    PaymentMethodLabel,
    PaymentMethodAddButton,
    PaymentMethodPayment,
    PaymentMethodDiv
}