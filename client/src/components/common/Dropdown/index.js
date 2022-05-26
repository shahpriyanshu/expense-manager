import React, { useState, useEffect, useCallback } from 'react';
import { DropdownContainer, MenuContainer, MenuOption, MenuTitle } from './dropdown.style';

const Dropdown = ({ options, isOpen, trigger, handleSelect, customDropdownStyle, customMenuStyle, toggleDropdown }) => {
    const [isMenuOpen, toggleMenu] = useState(isOpen);
    const closeMenu = useCallback(
        (event) => {
            event.preventDefault();
            event.stopPropagation();
            toggleMenu(false);
            toggleDropdown(false);
            document.removeEventListener('click', closeMenu);
        },
        [isMenuOpen, toggleDropdown]
    );

    useEffect(() => {
        toggleMenu(isOpen)
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('click', closeMenu);
        }
        // toggleMenu(isOpen);
        // eslint-disable-next-line no-unused-expressions
        () => {
            document.removeEventListener('click', closeMenu);
        };
    }, [closeMenu]);

    return (
        <DropdownContainer customDropdownStyle={customDropdownStyle}>
            {trigger}
            {isMenuOpen && (
                <MenuContainer customMenuStyle={customMenuStyle}>
                    {options.map((option) => {
                        if (option !== null) {
                            return (
                                <MenuOption key={option.value} id={option.value} onClick={() => handleSelect(option)}>
                                    {option?.icon && <>{option.icon}</>}
                                    <MenuTitle>{option.label}</MenuTitle>
                                </MenuOption>
                            );
                        }
                    })}
                </MenuContainer>
            )}
        </DropdownContainer>
    );
};

export default Dropdown;
