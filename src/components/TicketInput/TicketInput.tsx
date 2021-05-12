import React from 'react'
import styled from 'styled-components'

import Input, { InputProps } from './Input'


const TicketInput: React.FC<InputProps> = ({
  onChange,
  value,
}) => {
  return (
    <StyledTicketInput>
      <Input
        onChange={onChange}
        value={value}
      />
    </StyledTicketInput>
  )
}


const StyledTicketInput = styled.div`
width: 56px;
height: 60px;
`


export default TicketInput