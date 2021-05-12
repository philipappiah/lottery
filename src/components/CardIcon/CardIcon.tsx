import React from 'react'
import styled from 'styled-components'

interface CardIconProps {
  children?: React.ReactNode,
}

const CardIcon: React.FC<CardIconProps> = ({ children }) => (
  <StyledCardIcon>
    {children}
  </StyledCardIcon>
)

const StyledCardIcon = styled.div`
  background-color: ${props => props.theme.color.white};
  font-size: 36px;
  height: 60px;
  width: 60px;
  border-radius: 40px;
  align-items: center;
  display: flex;
  justify-content: center;
  box-shadow: inset 4px 4px 8px ${props => props.theme.color.grey[300]},
    inset -6px -6px 12px ${props => props.theme.color.grey[100]};
  margin: 0 -5px 0px;
`

export default CardIcon