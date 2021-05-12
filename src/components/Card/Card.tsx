import React from 'react'
import styled from 'styled-components'

const Card: React.FC = ({ children }) => (
  <StyledCard>
    {children}
  </StyledCard>
)

const StyledCard = styled.div`
margin-top:10px;
  background-color: ${props => props.theme.color.grey[800]};
  border: 1px solid ${props => props.theme.color.grey[900]};
  border-radius: 12px;
  box-shadow: inset 1px 1px 0px ${props => props.theme.color.grey[700]};
  display: flex;
  flex: 1;
  flex-direction: column;
`

export default Card