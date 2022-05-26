import React, { useState } from 'react';
import {PrimaryButton, OTPContainer, OTPInput} from './';
import {ErrorBox} from '../style';

const OTPInputGroup = (props) => {
    const { onOTPSubmit, error, setError } = props;
    const [otpMap, setOtpMap] = useState([]);
    const [isSubmitDisabled, setSubmitdisabled] = useState(true);
 
 const handleChange = (event, index) => {
   setError(null);
    otpMap[index] = event?.target?.value;
    if (otpMap.length === 6) {
        setSubmitdisabled(false);
    }
    setOtpMap(otpMap)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    onOTPSubmit(otpMap.join(''));
  }

  const inputfocus = (elmnt) => {
    if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
      const next = elmnt.target.tabIndex - 2;
      if (next > -1) {

        elmnt.target.form.elements[next].focus()
      }
    }
    else {
        const next = elmnt.target.tabIndex;
        if (next < 6) {
          elmnt.target.form.elements[next].focus()
        }
    }

  }

 
    return (
      <form onSubmit={(e) => handleSubmit(e)}>
        <OTPContainer>
          <OTPInput
            autoFocus
            name="otp1"
            type="tel"
            autoComplete="off"
            className="otpInput"
            value={otpMap[0]}
            onChange={e => handleChange(e, 0)}
            tabIndex="1" maxLength="1" onKeyUp={e => inputfocus(e)}

          />
          <OTPInput
            name="otp2"
            type="tel"
            autoComplete="off"
            className="otpInput"
            value={otpMap[1]}
            onChange={e => handleChange(e, 1)}
            tabIndex="2" maxLength="1" onKeyUp={e => inputfocus(e)}

          />
          <OTPInput
            name="otp3"
            type="tel"
            autoComplete="off"
            className="otpInput"
            value={otpMap[2]}
            onChange={e => handleChange(e, 2)}
            tabIndex="3" maxLength="1" onKeyUp={e => inputfocus(e)}

          />
          <OTPInput
            name="otp4"
            type="tel"
            autoComplete="off"
            className="otpInput"
            value={otpMap[3]}
            onChange={e => handleChange(e, 3)}
            tabIndex="4" maxLength="1" onKeyUp={e => inputfocus(e)}
          />

          <OTPInput
            name="otp5"
            type="tel"
            autoComplete="off"
            className="otpInput"
            value={otpMap[4]}
            onChange={e => handleChange(e, 4)}
            tabIndex="5" maxLength="1" onKeyUp={e => inputfocus(e)}
          />

        <OTPInput
            name="otp6"
            type="tel"
            autoComplete="off"
            className="otpInput"
            value={otpMap[5]}
            onChange={e => handleChange(e, 5)}
            tabIndex="6" maxLength="1" onKeyUp={e => inputfocus(e)}
          />
        </OTPContainer>
        {error && <ErrorBox>{error}</ErrorBox>}
        <PrimaryButton disabled={isSubmitDisabled} type="submit">
            Submit
        </PrimaryButton>
      </form>
    );
  }

  export default OTPInputGroup;
