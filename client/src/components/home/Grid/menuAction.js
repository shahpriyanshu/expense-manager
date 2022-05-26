import React, {useState} from 'react';
import Dropdown from '../../common/Dropdown';
import { ActionIcon } from './style';

const actions = [
    {
        label: "Edit",
        value: "edit"
    },
    {
        label: "Delete",
        value: "delete"
    }
]

const MenuAction = ({row, handleRowAction}) => {
    const [isDropdownOpen, toggleDropdown] = useState(false);

    const handleAction = (option, row) => {
        handleRowAction(row, option);
        toggleDropdown(false);
    }

    return (
        <Dropdown id="xyz"
            options={actions}
            isOpen={isDropdownOpen}
            trigger={<ActionIcon selected={isDropdownOpen} size={15} onClick={() => toggleDropdown(!isDropdownOpen)}/>}
            handleSelect={(option) => handleAction(option, row)}
            toggleDropdown={toggleDropdown}
        />
    )
}

export default MenuAction;