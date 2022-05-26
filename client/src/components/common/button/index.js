import styled, {css} from "styled-components";
import OTPInputGroup from "./OTPButton";

const PrimaryButton = styled.button`
  background-color: #0d98ba;
  border: 0px solid #5191c6;
  border-radius: 5px;
  padding: 10px 20px;
  color: white;
  font-size: 16px;
  display: flex;
  width: 100%;
  justify-content: center;
  align-self: center;
  cursor: pointer;
  margin: 1rem auto;
  :disabled,
  [disabled] {
    border: 1px solid #999999;
    background-color: #cccccc;
    color: #666666;
  }
`;

const RightAlignButton = css`
    margin-left: auto;
`;

const Button = styled.button`
${props => props.alignRight && RightAlignButton}
  background-color: #0d98ba;
  border: 0px solid #5191c6;
  border-radius: 5px;
  padding: 8px 14px;
  color: white;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-self: center;
  cursor: pointer;
  margin-top: 1rem;
  :disabled,
  [disabled] {
    border: 1px solid #999999;
    background-color: #cccccc;
    color: #666666;
  }
`;

const OTPContainer = styled.div`
  margin: 5% auto;
`;

const OTPInput = styled.input`
  width: 2rem;
  height: 2rem;
  margin: 2px;
  font-size: 1.25rem;
  text-align: center;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const ClearButton = styled.button`
  background-color: transparent;
  border-width: 0;
  color: #0d98ba;
  font-family: inherit;
  font-size: 14px;
  font-style: inherit;
  font-weight: inherit;
  line-height: inherit;
  padding: 4px;
  margin: 4px;;
`;

export { PrimaryButton, Button, ClearButton, OTPInputGroup, OTPContainer, OTPInput };
