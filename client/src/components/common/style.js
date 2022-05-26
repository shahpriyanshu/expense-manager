import styled from 'styled-components';
import {Link} from 'react-router-dom';


export const Flex = styled.div`
    display: flex;
    flex-direction: ${props => props.flexDirection};
    margin: 0.4rem;
    align-items: ${props => props.alignItems};
    justify-content: ${props => props.justifyContent};
    align-self: ${props => props.alignSelf};
`;


export const Modal = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    border: 0 solid #e2e8f0;
    margin: auto;
    padding: 2rem 1.5rem;
    width: ${props => props.width || '300px'};
    background-color: #ffffff;
    border-radius: 0.5em;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

export const AuthActionTextWrapper = styled.div`
    display: flex;
    text-align: start;
`;

export const SecondaryText = styled.span`
    font-size: 14px;
`;

export const PrimaryText = styled.p`
    font-size: 1.25rem;
    font-weight: 400;
    margin-bottom: 1rem;
`;

export const CustomLink = styled(Link)`
    color: #0D98BA;
    text-decoration: none;
    cursor: pointer;
`

export const Select = styled.select`
    margin: 10px;
    min-height: max-content;
    width: -webkit-fill-available;
    padding: 6px 10px;
    border: 1.5px solid #dfe3e9;
    line-height: 1.25rem;
`;

export const Label = styled.label`
    position: absolute;
    color: #A5B2B9;
    background: #ffffff;
    font-size: 10px;
    padding: 2px;
    line-height: 1rem;
    margin-left: 14px;
`;

export const  ErrorBox = styled.span`
    color: red;
    font-size: 12px;
    margin: 0 0.5rem;
    text-align: start;
`