import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Auth } from 'aws-amplify';
import { Input, InputGroup } from '../common/Input/style';
import { PrimaryButton, OTPInputGroup } from '../common/button';
import { Modal, AuthActionTextWrapper, PrimaryText ,SecondaryText, CustomLink, ErrorBox } from '../common/style';

const Signup = (props) => {
    const [emailId, setEmailId] = useState(null);
    const [userName, setUserName] = useState(null);
    const [password, setPassword] = useState(null);
    const [isVerificationState, toggleVerificationState] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const registerUser = async (event) => {
        event.preventDefault();
        try {
            const { user } = await Auth.signUp({
                username: userName,
                password,
                attributes: {
                    email: emailId
                }
            })
            if (user) {
                setUserDetails(user);
                toggleVerificationState(true);
            }
        } catch (err) {
            console.error(err);
            setError(err.message);
        }
    }

    const verifyOTP = async (otp) => {
        const { username } = userDetails;
        await Auth.confirmSignUp(username, otp).then(async (res) => { 
            await Auth.signIn(userName, password).then((res) => {
                if (res) {
                    const {accessToken, refreshToken} = res?.signInUserSession;
                    document.cookie = `accessToken=${accessToken};HttpOnly;secure`;
                    document.cookie = `refreshToken=${refreshToken};HttpOnly;secure`;
                    // update user at root level
                    props.setUserDetails(res);
                    navigate('/', {state: {isNweUser: true}});
                }
            })
        }).catch((err) => { 
            console.error(err);
            setError(err.message);
        })
    }

    return (
        <Modal>
            {!isVerificationState ? <>
                <h2>Expense manager</h2>
                <h4>Start managing your expenses</h4>
                <SecondaryText>Sign up with</SecondaryText>
                <InputGroup>
                    <Input type="email" placeholder="Email" value={emailId} onChange={(e => {
                        e.preventDefault();
                        setError(null)
                        setEmailId(e.target.value)
                    })} />
                    <Input type="text" placeholder="User name" value={userName} onChange={(e => {
                        e.preventDefault();
                        setUserName(e.target.value)
                        setError(null)
                    })} />
                    <Input type="password" placeholder="Password" value={password} onChange={(e => {
                        e.preventDefault();
                        setPassword(e.target.value)
                        setError(null);
                    })} />
                </InputGroup>
                {error && <ErrorBox>{error}</ErrorBox>}
                <PrimaryButton onClick={event => registerUser(event)}>Sign up</PrimaryButton>
                <AuthActionTextWrapper>
                    <SecondaryText>Already have an account? <CustomLink to="/signin">Sign in</CustomLink></SecondaryText>
                </AuthActionTextWrapper>
            </> :
                <>
                    <h3>Verify Email</h3>
                    <PrimaryText>An OTP has been sent to you. Please enter below</PrimaryText>
                    <OTPInputGroup onOTPSubmit={verifyOTP} error={error} setError={setError} />
                </>
            }
        </Modal>
    )
}

export default Signup;