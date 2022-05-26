import styled from "styled-components";
import {FaRegUserCircle} from "react-icons/fa"

export const Container = styled.div`
    display: flex;
    margin-top: 2rem;
`;

export const Flex = styled.div`
    display: flex;
    flex-direction: ${props => props.flexDirection};
    margin: 0.4rem;
    align-items: ${props => props.alignItems};
    justify-content: ${props => props.justifyContent};
    align-self: ${props => props.alignSelf};
`;

export const SalutationText = styled.div`
    color: #484848;
    font-weight: 600;
    font-size: 30px;
    margin: 0.4rem 0;
`;

export const CustomUserIcon = styled(FaRegUserCircle)`
    stroke-width: 1;
`;

export const DisbaledText = styled.span`
    color: #A5B2B9;
    font-size: 16px;
    margin: 0 0 10px;
`;
