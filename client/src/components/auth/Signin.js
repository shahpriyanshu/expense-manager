import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { Input, InputGroup } from '../common/Input/style';
import { PrimaryButton } from '../common/button';
import { Modal, SecondaryText, CustomLink, AuthActionTextWrapper, ErrorBox } from '../common/style';

const Signin = (props) => {
    const [userName, setUserName] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(null);

    const navigateTo = useNavigate();
    const signInUser = async (event) => {
            event.preventDefault();
          //  navigateTo('/signup',  { replace: true });
            await Auth.signIn(userName, password).then((res) => {
                if (res) {
                    const {accessToken} = res?.signInUserSession;
                    document.cookie = `accessToken=${accessToken.jwt};HttpOnly;secure`;
                    props.setUserDetails(res);
                    navigateTo('/', {state: {isNweUser: false}});
                }   
            }).catch((err) => { 
                console.error(err.message);
                setError(err.message);
            })
    }

    return (
        <Modal>
            <h2>Expense manager</h2>
            <h4>Start managing your expenses</h4>
            <SecondaryText>Sign in</SecondaryText>
            <InputGroup>
                <Input type="text" placeholder="User name" value={userName} onChange={(e => {
                    e.preventDefault();
                    setError(null);
                    setUserName(e.target.value)
                })} />
                <Input type="password" placeholder="Password" value={password} onChange={(e => {
                    e.preventDefault();
                    setError(null);
                    setPassword(e.target.value)
                })} />
            </InputGroup>
        {error && <ErrorBox>{error}</ErrorBox>}
            <PrimaryButton onClick={event => signInUser(event)}>Sign in</PrimaryButton>
            <AuthActionTextWrapper>
                <SecondaryText>Don't have an account? <CustomLink to="/signup">Sign up now</CustomLink></SecondaryText>
            </AuthActionTextWrapper>
        </Modal>
    )
}

export default Signin;