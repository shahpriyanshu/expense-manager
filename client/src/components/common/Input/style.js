import styled from "styled-components";

export const Input = styled.input`
    margin: 10px;
    min-height: max-content;
    width: -webkit-fill-available;
    padding: 6px 10px;
    border: ${props => props.error ? '1px solid rgb(210, 43, 43)' : '1.5px solid #dfe3e9'};
    line-height: 1.25rem;
`;

export const InputGroup = styled.div`
    width: 100%;
    display: flex;
    margin: 14px 0px;
    flex-direction: column;
`

export const ErrorBox = styled.span`
    color: red;
    font-size: 12px;
    padding: 5px;
`