import React from 'react'
import styled from 'styled-components'
import  Configuration  from '../../../config';

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledLink href= {buyGOT} target="_blank">获取GOT</StyledLink>
      <StyledLink href= {buyGOS} target="_blank">获取GOS</StyledLink>
      <StyledLink href= {buyGOC} target="_blank">获取GOC</StyledLink>
      <StyledLink href="https://github.com/go-protocol/gocash-core" target="_blank">GitHub</StyledLink>
      <StyledLink href="https://twitter.com/GoSwapio" target="_blank">Twitter</StyledLink>
      <StyledLink href="https://t.me/Goswapio" target="_blank">Telegram</StyledLink>
      <StyledLink href="https://discord.gg/skDprzw8Du" target="_blank">Discord</StyledLink>
      <StyledLink href="https://medium.com/@goswapio" target="_blank">Medium</StyledLink>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
  @media (max-width: 835px) {
    margin-bottom:20px;
  }
`

const StyledLink = styled.a`
  color: ${props => props.theme.color.grey[200]};
  padding-left: ${props => props.theme.spacing[3]}px;
  padding-right: ${props => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${props => props.theme.color.grey[0]};
  }
`

const buyGOT ="https://goswap.app/#/swap?inputCurrency="+Configuration.externalTokens['HUSD'][0]+"&outputCurrency="+Configuration.externalTokens['GOT'][0];
const buyGOS ="https://goswap.app/#/swap?inputCurrency="+Configuration.externalTokens['HUSD'][0]+"&outputCurrency="+Configuration.externalTokens['GOS'][0];
const buyGOC= "https://goswap.app/#/swap?inputCurrency="+Configuration.externalTokens['HUSD'][0]+"&outputCurrency="+Configuration.externalTokens['GOC'][0];
export default Nav