import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import Label from '../../../components/Label';
import { TokenStat } from '../../../go-farm/types';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import TokenSymbol from '../../../components/TokenSymbol';
// import { commify } from 'ethers/lib/utils';
import config from '../../../config';
import { BigNumber } from 'ethers';
import { getDisplayBalance } from '../../../utils/formatBalance';
// import { CountdownRenderProps } from 'react-countdown';

interface HomeCardProps {
  title: string;
  symbol: string;
  color: string;
  supplyLabel?: string;
  address: string;
  startTime: Date;
  stat?: TokenStat;
  tvl?: BigNumber;
}

const HomeCard: React.FC<HomeCardProps> = ({
  title,
  symbol,
  color,
  address,
  startTime,
  supplyLabel = 'Total supply',
  stat,
  tvl,
}) => {
  const tokenUrl = `${config.etherscanUrl}/token/${address}`;
  // const countdownRenderer = (countdownProps: CountdownRenderProps) => {
  //   const { days, hours, minutes, seconds } = countdownProps;
  //   const h = String(days * 24 + hours);
  //   const m = String(minutes);
  //   const s = String(seconds);
  //   return (
  //     <StyledCountdown>
  //       {h.padStart(2, '0')}:{m.padStart(2, '0')}:{s.padStart(2, '0')}
  //     </StyledCountdown>
  //   );
  // };
  return (
    <Wrapper>
      <CardHeader>{title}</CardHeader>
      <StyledCards>
        <TokenSymbol symbol={symbol} />
        <CardSection>
          {stat ? (
            <StyledValue>{(stat.priceInDAI !== '-' ? '$' : '') + stat.priceInDAI}</StyledValue>
          ) : (
            <ValueSkeleton />
          )}
          <StyledSupplyLabel href={tokenUrl} target="_blank" color={color}>
            <Label text="Current price" color="#E83725" />
          </StyledSupplyLabel>
        </CardSection>

        {/* <CardSection>
          {stat ? <StyledValue>{commify(stat.totalSupply)}</StyledValue> : <ValueSkeleton />}
          <StyledSupplyLabel href={tokenUrl} target="_blank" color={color}>
            {supplyLabel}
          </StyledSupplyLabel>
        </CardSection> */}

        <CardSection>
          {tvl ? (
            <StyledValue>${getDisplayBalance(tvl, 18, 0)}</StyledValue>
          ) : (
            <ValueSkeleton />
          )}
          <Label text="Total deposit amount" color="#ECF25C" />
        </CardSection>
      </StyledCards>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  @media (max-width: 768px) {
    margin-top: ${(props) => props.theme.spacing[4]}px;
  }
`;

const CardHeader = styled.h2`
  color: #fff;
  text-align: center;
`;

// const StyledCountdown = styled.p`
//   font-size: 36px;
//   font-weight: 700;
//   color: ${(props) => props.theme.color.grey[100]};
//   margin: 0 0 6px 0;
// `;
const StyledCards = styled.div`
  min-width: 200px;
  padding: ${(props) => props.theme.spacing[3]}px;
  color: ${(props) => props.theme.color.white};
  background-color: ${(props) => props.theme.color.grey[900]};
  border-radius: 5px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledValue = styled.span`
  display: inline-block;
  font-size: 36px;
  color: #eeeeee;
`;

const CardSection = styled.div`
  margin-bottom: ${(props) => props.theme.spacing[4]}px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ValueSkeletonPadding = styled.div`
  padding-top: ${(props) => props.theme.spacing[3]}px;
  padding-bottom: ${(props) => props.theme.spacing[2]}px;
`;

const StyledSupplyLabel = styled.a`
  display: block;
  text-decoration: none;
  color: ${(props) => props.color};
`;

const ValueSkeleton = () => {
  const theme = useContext(ThemeContext);
  return (
    <SkeletonTheme color={theme.color.grey[700]} highlightColor={theme.color.grey[600]}>
      <ValueSkeletonPadding>
        <Skeleton height={10} />
      </ValueSkeletonPadding>
    </SkeletonTheme>
  );
};

// const GuideText = styled.span`
//   color: ${(props) => props.theme.color.primary.main};
//   font-size: 0.8rem;
// `;

// const ValueText = styled.p`
//   color: ${(props) => props.theme.color.white};
//   font-weight: bold;
//   font-size: 1.25rem;
//   margin: ${(props) => props.theme.spacing[1]}px 0;
// `;

export default HomeCard;
