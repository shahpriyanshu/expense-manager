import React, { useState } from "react";
import {useNavigate} from 'react-router';
import {Auth} from 'aws-amplify';
import Dropdown from "../Dropdown";
import { HeaderWrapper, HeaderText, Avatar, UserProfileWrapper } from "./style";

const actions = [
  {
    label: "Logout",
    value: "logout",
  },
];

const Header = (props) => {
  const { user } = props;
  const navigateTo = useNavigate();
  const [isDropdownOpen, toggleDropdown] = useState(false);

  const handleUserSignOutRequest = async() => {
      try {
        await Auth.signOut();
        navigateTo('/signin');
        document.cookie = `accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
      } catch (err) {
        console.log('error signing out: ', err);
      }
  }

  return (
    <HeaderWrapper>
      <div>
        <HeaderText>Expense Manager</HeaderText>
      </div>
      <Dropdown
        options={actions}
        isOpen={isDropdownOpen}
        trigger={
          <UserProfileWrapper onClick={() => toggleDropdown(true)}>
            <Avatar size={20} />
            <span>{user.username}</span>
          </UserProfileWrapper>
        }
        handleSelect={(option) => handleUserSignOutRequest()}
        toggleDropdown={toggleDropdown}
      />
    </HeaderWrapper>
  );
};

export default Header;
