import styled, { css } from "styled-components";
import { FlexboxStructure, mediaAdjustments, phoneAdjustments, PxToRem } from "../../../../theme/styles";

const AddressFormBase = styled.div`
    ${FlexboxStructure("column","center","center")};
    position: fixed;
    left:50%;
    bottom: -100%;
    transform:translateX(-50%);
    padding: 2rem;
    gap:0.5rem;
    box-shadow: 0 2px 12px rgba(36, 36, 36, 0.2); 
    opacity: 0;
    transition: all 0.3s ease-in-out;
    width: 900px;
    height: 600px;
    background: ${p=>p.theme.colors.white};
    border-radius: .1rem;
    color: ${p=>p.theme.colors.background};
    &.form--show{
        opacity: 1;
        bottom:25%;
    }
    ${mediaAdjustments(css`
        padding: 1.5rem;
        width: 675px;
        height: 450px;
    `)};
    ${phoneAdjustments(css`
        padding: 1rem;
        width: 550px;
        height: 450px;
    `)};
`;

const AdressStructureForm = styled.form`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: repeat(3,auto);
    grid-template-areas: 
        "direccion direccion direccion"
        "externo interno  postal"
        "colonia pais button"
    ;
    padding: 2rem;
    border: 2px dashed ${p=>p.theme.colors.buttons};
    ${mediaAdjustments(css`
        padding: 1rem;
    `)};
    ${phoneAdjustments(css`
        padding: 1rem;
    `)};
`;

const AddressDiv = styled.div<{$grid_name:string,$show_data:boolean | null}>`
    grid-area: ${({ $grid_name }) => 
        $grid_name === "direccion" ? "direccion" :
        $grid_name === "interno" ? "interno" :
        $grid_name === "externo" ? "externo" :
        $grid_name === "postal" ? "postal" :
        $grid_name === "colonia" ? "colonia" :
        $grid_name === "pais" ? "pais" :
        "auto"
    };
    ${FlexboxStructure("column","flex-start","center")};
    gap: .5rem;
    margin: 1.5rem;
    color: ${p=>p.theme.colors.background};
    font-size: ${PxToRem(20)};
    ${mediaAdjustments(css`
        font-size: ${PxToRem(16)};
        margin: 1rem;
    `)};
    ${phoneAdjustments(css`
        font-size: ${PxToRem(12)};
        margin: .75rem;
    `)};
    label{
        width: 100%;
        font-family: ${p=>p.theme.fonts.primary};
        font-size: inherit;
        text-align: left;
    }
    input{
        background-color: #ffffff00;
        border-radius: .5rem;
        border:4px solid ${p=>p.theme.colors.buttons};
        font-family: ${p=>p.theme.fonts.secondary};
        font-size: ${PxToRem(28)};
        width: 100%;
        &::placeholder{
            background-color: #ffffff00;
        }
    }
    p{
        display: ${({$show_data})=> 
            ($show_data ===null || $show_data===true) ? `none` : 
            `inline-block`
        };
        color: ${p=>p.theme.colors.buttons};
        font-size:${PxToRem(20)};
        font-weight:700;
        margin:0;

    }
`;
const AddressAddButton = styled.button`
    grid-area: button;
    align-self: center;
    ${FlexboxStructure("row","center","center")};
    color: ${p=>p.theme.colors.white};
    background-color: ${p=>p.theme.colors.buttons};
    border:1px solid ${p=>p.theme.colors.buttons};
    border-radius: 1rem;
    width: auto;
    height: 50%;
    gap: .75rem;
    font-size: ${PxToRem(28)};  
    transition: ${p=>p.theme.buttons.transition};
    cursor: pointer;
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
    i{
        font-size:inherit;
        display: flex;
        justify-content: center;
        text-align: center;
        line-height: 1;
    }
    p{
        font-size:inherit;  
        text-align: center;
        line-height: 1;
        margin: 0;
    }
`;

const AddressCancel = styled.div`
    align-self: flex-end;
    ${FlexboxStructure("column","center","center")};
    color: ${p=>p.theme.colors.buttons};
    background-color: none;
    transition: ${p=>p.theme.buttons.transition};
    cursor: pointer;
    &:hover{
        transform: ${p=>p.theme.buttons.scale};
        filter: ${p=>p.theme.buttons.bright};
    }
    i{
        color: ${p=>p.theme.colors.buttons};
        font-size: ${PxToRem(28)};    
        display: flex;
        justify-content: flex-end;
        text-align: right;
        line-height: 1;
        margin: 0;
        font-weight: 900;
        ${mediaAdjustments(css`
            font-size: ${PxToRem(24)};
        `)};
        ${phoneAdjustments(css`
            font-size: ${PxToRem(20)};
        `)};
    }
`;


export {
    AddressFormBase,
    AdressStructureForm,
    AddressDiv,
    AddressAddButton,
    AddressCancel,
}