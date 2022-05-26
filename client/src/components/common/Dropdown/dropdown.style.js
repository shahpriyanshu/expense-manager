import styled from 'styled-components';

export const DropdownContainer = styled.div`
    ${(props) => props.customDropdownStyle}
    min-width: 8rem;
    color: rgba(25, 23, 17, 0.6);
    display: flex;
    white-space: nowrap;
    align-items: center;
    justify-content: flex-end;
    cursor: pointer;
    overflow: visible;

`;

export const MenuContainer = styled.div`
    ${(props) => props.customMenuStyle}
    box-shadow: 0 8px 24px rgba(149, 157, 165, 0.2);
    border: 1px solid #e1e4e8;
    justify-content: center;
    align-items: center;
    position: absolute;
    margin-right: 12px;
    z-index: 99;
    padding: {
        top: 10px;
        bottom: 10px;
    }
    width: 200px;
    margin-top: 95px;
    overflow: auto;
    animation-duration: 110ms;
    animation-timing-function: cubic-bezier(0.2, 0, 0.13, 1.5);
    animation-name: scale-in;

    @keyframes scale-in {
        0% {
            transform: scale(0.5);
        }
        100% {
            transform: scale(1);
        }
    }
`;

export const MenuOption = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    padding: 8px;
    background-color: #ffffff;
    &:hover {
        cursor: pointer;
        background-color: #bcd4e6;
    }
`;

export const MenuTitle = styled.div`
    font-size: 14px;
    font-weight: 400px;
    color: var(--light-slate);
    margin-left: 15px;
`;
