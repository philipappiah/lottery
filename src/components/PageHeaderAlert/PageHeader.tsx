import React from 'react'
import styled from 'styled-components'

interface PageHeaderProps {
  icon?: React.ReactNode,
  subtitle?: string,
  title?: string,
}

const PageHeader: React.FC<PageHeaderProps> = ({ icon, subtitle, title }) => {
  return (
    <StyledPageHeader>
      <StyledIcon>{icon}</StyledIcon>
      <StyledTitle>{title}</StyledTitle>
      {/* eslint-disable-next-line */}
      <StyledSubtitle>⚠️重要通知:⚠️</StyledSubtitle>
      <StyledSubtitle>星际农场将于北京时间2021年4月9日中午12点停矿并迁移至星际农场V2</StyledSubtitle>
      <StyledSubtitle>请在停矿前将存入的LP Token手动提取并存入星际农场V2</StyledSubtitle>
      <StyledSubtitle>停矿后星际农场V1的LP Token仍然可以取出,奖励GOT将不再计算</StyledSubtitle>
      <StyledSubtitle>原定的4月GOT产出计划由2的11次幂减少到2的6次幂</StyledSubtitle>
      <StyledSubtitle>4月每个区块的GOT产量为0.003125 * 2 ** 6</StyledSubtitle>
      <StyledSubtitle>5月以后将不再设置奖励倍数,每个区块的GOT产量为0.003125</StyledSubtitle>
    </StyledPageHeader>
  )
}

const StyledPageHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding-bottom: ${props => props.theme.spacing[6]}px;
  width: 100%;
  margin: 0 auto;
`

const StyledIcon = styled.div`
  font-size: 96px;
  height: 180px;
  line-height: 96px;
  position: relative;
  text-align: center;
  width: 280px;
`

const StyledTitle = styled.h1`
  color: ${props => props.theme.color.grey[100]};
  font-size: 36px;
  font-weight: 700;
  margin: 0;
  padding: 0;
  text-shadow: 3px 3px 3px #000000;
`

const StyledSubtitle = styled.h1`
  color: ${props => props.theme.color.grey[100]};
  font-size: 22px;
  font-weight: 400;
  line-height:30px;
  margin: 0;
  padding: 0;
  text-shadow: 3px 3px 3px #000000;
  text-align: center;
  @media (max-width: 835px) {
    font-size: 25px;
  }
`

export default PageHeader