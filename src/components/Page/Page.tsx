import React from 'react'
import styled from 'styled-components'



const Page: React.FC = ({ children }) => (
  <StyledPage>
   
    <StyledMain>
      {children}
    </StyledMain>
 
  </StyledPage>
)

const StyledPage = styled.div``

const StyledMain = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 104px);
  padding-bottom: ${props => props.theme.spacing[5]}px;
`

export default Page