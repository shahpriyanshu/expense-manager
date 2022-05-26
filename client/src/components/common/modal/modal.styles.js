import styled from 'styled-components';
import {IoIosCloseCircleOutline} from 'react-icons/io';

export const ModalContainer = styled.div`
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    border: 0 solid #e2e8f0;
    margin: auto;
    padding: 2rem 1.5rem;
    width: ${props => props.width || '300px'};
    background-color: #ffffff;
    border-radius: 0.5em;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;;
`;

export const CloseIcon = styled(IoIosCloseCircleOutline)`
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
`