import styled from 'styled-components';
import {GoKebabVertical} from 'react-icons/go';

export const TableHeader = styled.th`
    min-width: ${props => props.width || 'auto'};
    font-weight: 500;
    color: #8190A2;
    border-bottom: 2px solid #e6eaee;
    padding: 0.5rem;
    line-height: 1.5;
    text-align: left;
`;

export const TableData = styled.td`
    padding: 8px;
    border-bottom: 1px solid #e6eaee;
`

export const ActionIcon = styled(GoKebabVertical)`
    background-color: ${props => props.selected ?  '#0070ff' : 'none'};
    color: ${props => props.selected ? '#ffffff' : '#0070ff'};
    padding: 8px;
    cursor: pointer;
    :hover { 
        background: #6ca0dc;
        color: #ffffff;
    }
`;

export const TableRow = styled.tr`
    font-size: 14px;
    border-bottom: 2px solid #e6eaee;
`;
