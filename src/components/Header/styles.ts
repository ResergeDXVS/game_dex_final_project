import styled, { css } from "styled-components";
import { FlexboxStructure, mediaAdjustments, phoneAdjustments, PxToRem} from "../../theme/styles";


const HeaderBase = styled.header`
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: auto;
    grid-template-areas: 
        "logo catalog icons";
    justify-content: center;
    align-items: center;
    width: 100%;
    height: fit-content;
    padding: 1.5rem 2.75rem;
    box-sizing: border-box;
    background-color: ${props => props.theme.colors.background};

    ${mediaAdjustments(css`
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: auto;
        grid-template-areas: 
            "logo catalog icons";
        padding: 1rem 1.5rem;
    `)};
    ${phoneAdjustments(css`
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto auto;
        grid-template-areas: 
            "logo icons"
            "catalog catalog";
        padding: 1rem;
    `)};
`;

const HeaderLogo = styled.section`
    grid-area: logo;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin-left: 2rem;
    width: fit-content;
    transition: ${p=>p.theme.buttons.transition};
    &:hover{
        transform: ${p=>p.theme.buttons.scale};
    }
    img{
        width: 120px;
        height: auto;
    }
    p{
        font-size: ${PxToRem(24)};
        font-family: ${props => props.theme.fonts.primary};
        color: ${props => props.theme.colors.buttons};
        line-height: 1.2;
        font-weight: 900;
    }
    
`;

const HeaderOptions = styled.section`
    grid-area: catalog;
    ${FlexboxStructure("row","center","center")};
    width: auto;
    padding: 10px;
    transition: ${props=>props.theme.hovers.transition};
    gap:2rem;
    a{
        font-size: ${PxToRem(20)};
        font-family: ${props => props.theme.fonts.primary};
        color: ${props => props.theme.colors.white};
        line-height: 1.15;
        font-weight: 900;
        text-decoration: none;
        cursor: pointer;
        transition: ${p=>p.theme.hovers.transition};
        &:hover{
            transform: ${p=>p.theme.hovers.scale};
            filter: ${p=>p.theme.hovers.bright};
        }
    }
    ${mediaAdjustments(css`
        gap:1.5rem;
    `)};
    ${phoneAdjustments(css`
        gap:3rem;
    `)};
    
`;

const HeaderIcons = styled.section`
    grid-area: icons;
    ${FlexboxStructure("row","flex-end","center")};
    width: auto;
    padding: 0 6px;
    transition: ${props=>props.theme.hovers.transition};
    gap:2rem;
    margin-right: 2rem;
    >div{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: ${PxToRem(60)};
        height: ${PxToRem(60)};
        background-color: ${props => props.theme.colors.gray};
        border-radius: 50%;
        margin: 0;
        padding: 0;
        i{
            font-size: ${PxToRem(36)};    
            color: ${props => props.theme.colors.white};
            display: flex;
            justify-content: center;
            text-align: center;
            line-height: 1;
        }
        h1{
            font-size: ${PxToRem(36)};   
            color: ${props => props.theme.colors.white}; 
            display: flex;
            justify-content: center;
            text-align: center;
            line-height: 1;
            font-weight: 700;
            margin: 0;
        }
        
    }
    #icon-user{
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: ${props => props.theme.colors.gray};
    }
`;

const HeaderUserContainer = styled.section`
    position: absolute;
    top: 120%;
    right: -165%;
    width: 360px;
    z-index: 10;
    background-color: ${props => props.theme.colors.white};
    padding: 1rem;
    border-radius: 0.5rem;
    font-size: 0.8rem;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    opacity: 0;
    pointer-events: none;
    &.user--show {
        opacity: 1;
        pointer-events: auto;
    }
`;





export {
    HeaderBase,
    HeaderLogo,
    HeaderOptions,
    HeaderIcons,
    HeaderUserContainer
}