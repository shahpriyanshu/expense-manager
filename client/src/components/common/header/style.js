import styled from 'styled-components';
import {FaUser} from 'react-icons/fa';

export const HeaderWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    padding: 4px;
    width: 100%;
    background-color: darkslategray;
    height: fit-content;
`;

export const Avatar = styled(FaUser)`
    color: whitesmoke;
    margin-right: 0.25rem;
`



export const HeaderText = styled.h3`
    color: white;
    font-size: 12px;
    margin-left: 0.5rem;
`

export const UserProfileWrapper = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    top: 10px;
    right: 1.5rem;
    cursor: pointer;
    color: whitesmoke;
    font-size: 12px;
`