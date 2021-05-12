import React from 'react';
import styled from 'styled-components';

export interface InputProps {
  endAdornment?: React.ReactNode;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  placeholder?: string;
  startAdornment?: React.ReactNode;
  value: string;
}

const Input: React.FC<InputProps> = ({
  endAdornment,
  onChange,
  placeholder,
  startAdornment,
  value,
}) => {
  return (
    <StyledInputWrapper>
      {!!startAdornment && startAdornment}
      <StyledInput
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={2}
        type={'tel'}
      />
      {!!endAdornment && endAdornment}
    </StyledInputWrapper>
  );
};

const StyledInputWrapper = styled.div`
  align-items: center;
  background-color: ${(props) => props.theme.color.grey[200]};
  border-radius: ${(props) => props.theme.borderRadius}px;
  display: flex;
`;

const StyledInput = styled.input`
  padding: 0 ${(props) => props.theme.spacing[3]}px;
  background: none;
  border: 0;
  color: ${(props) => props.theme.color.grey[600]};
  font-size: 30px;
  flex: 1;
  height: 56px;
  margin: 0;
  padding: 0;
  outline: none;
  width: 56px;
  text-align: center;
`;

export default Input;
