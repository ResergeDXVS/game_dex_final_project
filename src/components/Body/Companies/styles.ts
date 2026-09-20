import styled from "styled-components";

const InformationMsg = styled.section`
    width: auto;
    height: auto;
    margin: 1.75rem 2.75rem;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap:2rem;

`;

const CompaniesGrid = styled.section`
    width: auto;
    height: auto;
    margin: 1.75rem 2.75rem;
    padding: 2rem;
    display: grid;
    grid-template-columns: repeat(5, minmax(80px,1fr));
    grid-template-rows: repeat(2,75px);
    justify-content: center;
    align-items: center;
    gap:2rem;

`;

const CompanyElement = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    border: 2px solid ${props => props.theme.colors.details};
    border-radius: 0.5rem;
    height: 100%;
    img{
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
    }
`;

export {
    InformationMsg,
    CompaniesGrid,
    CompanyElement
}