import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { Lottery } from '../../go-farm';
import { TotalPot, Allocations } from '../../go-farm/types';
import Button from '../../components/Button';
import Card from '../../components/Card';
import CardContent from '../../components/CardContent';
import CardIcon from '../../components/CardIcon';
import useLotterys from '../../hooks/useLotterys';
import TokenSymbol from '../../components/TokenSymbol';
import ProgressCountdown from './components/ProgressCountdown';
import Notice from '../../components/Notice';
import useGoFarm from '../../hooks/useGoFarm';
import { BigNumber } from 'ethers';
import useLotteryTimes from '../../hooks/useLotteryTimes';
import { getDisplayBalance } from '../../utils/formatBalance';
import moment from 'moment';

const LotteryCards: React.FC = () => {
  const [lotterys] = useLotterys();

  const activeLotterys = lotterys.filter((lottery) => !lottery.finished);
  const inactiveLotterys = lotterys.filter((lottery) => lottery.finished);

  let finishedFirstRow = false;
  const inactiveRows = inactiveLotterys.reduce<Lottery[][]>(
    (lotteryRows, lottery) => {
      const newLotteryRows = [...lotteryRows];
      if (newLotteryRows[newLotteryRows.length - 1].length === (finishedFirstRow ? 2 : 2)) {
        newLotteryRows.push([lottery]);
        finishedFirstRow = true;
      } else {
        newLotteryRows[newLotteryRows.length - 1].push(lottery);
      }
      return newLotteryRows;
    },
    [[]],
  );

  return (
    <StyledCards>
      {inactiveRows[0].length > 0 && (
        <StyledInactiveNoticeContainer>
          <Notice color="grey">
            <b>You have lotterys where the mining has finished.</b>
            <br />
            Please withdraw and settle your stakes.
          </Notice>
        </StyledInactiveNoticeContainer>
      )}
      <StyledRow>
        {activeLotterys.map((lottery, i) => (
          <React.Fragment key={lottery.name}>
            <LotteryCard lottery={lottery} />
            {i % 2 !== 1 && <StyledSpacer />}
          </React.Fragment>
        ))}
      </StyledRow>
      {inactiveRows[0].length > 0 && (
        <>
          <StyledInactiveLotteryTitle>Inactive Lotterys</StyledInactiveLotteryTitle>
          {inactiveRows.map((lotteryRow, i) => (
            <StyledRow key={i}>
              {lotteryRow.map((lottery, j) => (
                <React.Fragment key={j}>
                  <LotteryCard lottery={lottery} />
                  {j < lotteryRow.length - 1 && <StyledSpacer />}
                </React.Fragment>
              ))}
            </StyledRow>
          ))}
        </>
      )}
    </StyledCards>
  );
};

interface LotteryCardProps {
  lottery: Lottery;
}

const LotteryCard: React.FC<LotteryCardProps> = ({ lottery }) => {
  const { prevEpochTime, nextEpochTime, epoch } = useLotteryTimes();
  const prevEpoch = useMemo(() => prevEpochTime, [prevEpochTime]);
  const nextEpoch = useMemo(() => moment(nextEpochTime).add(1, 'seconds').toDate(), [
    nextEpochTime,
  ]);

  const goFarm = useGoFarm();

  const [totalPot, setStats] = useState<TotalPot>({
    MTR: BigNumber.from(0),
    MUSD: BigNumber.from(0),
  });

  const [allocations, setAllocations] = useState<Allocations>({
    MTR: [BigNumber.from(0), BigNumber.from(0), BigNumber.from(0)],
    MUSD: [BigNumber.from(0), BigNumber.from(0), BigNumber.from(0)],
  });
  const fetchStats = useCallback(async () => {
    const [_totalPot, _allocations] = await Promise.all([
      goFarm.getTotalPot(),
      goFarm.getAllcation(),
    ]);
    setStats(_totalPot);
    setAllocations(_allocations);
  }, [goFarm, setStats, setAllocations]);

  useEffect(() => {
    if (goFarm) {
      fetchStats().catch((err) => console.error(err.stack));
    }
  }, [goFarm, fetchStats]);

  return (
    <StyledCardWrapper>
      {lottery.depositTokenName.includes('MUSD') ? (
        <StyledCardSuperAccent />
      ) : (
        <StyledCardNomal />
      )}
      <Card>
        <CardContent>
          <StyledContent>
            <LogoCard>
              <CardIcon>
                <TokenSymbol symbol={lottery.depositTokenName} size={60} />
              </CardIcon>
              <ProgressCountdown
                title={lottery.name}
                base={prevEpoch}
                deadline={nextEpoch}
                description={
                  epoch === 0
                    ? 'Tickets are on sale'
                    : epoch === 1
                    ? 'Tickets are sold out, waiting for the draw'
                    : 'The prize has been drawn, waiting for the next round to start'
                }
              />
            </LogoCard>
            <StyledDetails>
            Prize pool: {" "}
              {lottery.depositTokenName.includes('MUSD')
                ? getDisplayBalance(totalPot.MUSD, 18, 2)
                : getDisplayBalance(totalPot.MTR, 8, 2)} {" "}
              {lottery.depositTokenName}
            </StyledDetails>
            <StyledDetails>
              <StyledDetailsItem>First prize:</StyledDetailsItem>
              <StyledDetailsItem>
                {lottery.depositTokenName.includes('MUSD')
                  ? getDisplayBalance(totalPot.MUSD.mul(allocations.MUSD[0]).div(100), 18, 2)
                  : getDisplayBalance(totalPot.MTR.mul(allocations.MTR[0]).div(100), 8, 2)}
              </StyledDetailsItem>
            </StyledDetails>
            <StyledDetails>
              <StyledDetailsItem>second prize:</StyledDetailsItem>
              <StyledDetailsItem>
                {lottery.depositTokenName.includes('MUSD')
                  ? getDisplayBalance(totalPot.MUSD.mul(allocations.MUSD[1]).div(100), 18, 2)
                  : getDisplayBalance(totalPot.MTR.mul(allocations.MTR[1]).div(100), 8, 2)}
              </StyledDetailsItem>
            </StyledDetails>
            <StyledDetails>
              <StyledDetailsItem>Third Prize:</StyledDetailsItem>
              <StyledDetailsItem>
                {lottery.depositTokenName.includes('MUSD')
                  ? getDisplayBalance(totalPot.MUSD.mul(allocations.MUSD[2]).div(100), 18, 2)
                  : getDisplayBalance(totalPot.MTR.mul(allocations.MTR[2]).div(100), 8, 2)}
              </StyledDetailsItem>
            </StyledDetails>
            <StyledDetails>
              <StyledDetailsItem>
                {lottery.depositTokenName.includes('MUSD') ? `Repurchase MTRG :` : `Invest in the MUSD prize pool:`}
              </StyledDetailsItem>
              <StyledDetailsItem>
                {lottery.depositTokenName.includes('MUSD')
                  ? getDisplayBalance(
                      totalPot.MUSD.mul(
                        BigNumber.from(100).sub(allocations.MUSD[0]).sub(allocations.MUSD[1]).sub(allocations.MUSD[2]),
                      ).div(100),
                      18,
                      2,
                    )
                  : getDisplayBalance(
                      totalPot.MTR.mul(
                        BigNumber.from(100).sub(allocations.MTR[0]).sub(allocations.MTR[1]).sub(allocations.MTR[2]),
                      ).div(100),
                      8,
                      2,
                    )}
              </StyledDetailsItem>
            </StyledDetails>
            <Button text="Join" to={`/lottery/${lottery.depositTokenName}`} />
          </StyledContent>
        </CardContent>
      </Card>
    </StyledCardWrapper>
  );
};

const StyledDetailsItem = styled.div`
  display: flex;
`;

const LogoCard = styled.div`
  display: flex;
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: #666;
  border-bottom-style: solid;
  padding-bottom: 10px;
  margin-bottom: ${(props) => props.theme.spacing[2]}px;
`;
const StyledCardNomal = styled.div`
  border-radius: 12px;
  filter: blur(4px);
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: -1;
`;

// const StyledCardAccent = styled.div`
//   background: linear-gradient(
//     45deg,
//     rgba(255, 0, 0, 1) 0%,
//     rgba(255, 154, 0, 1) 10%,
//     rgba(208, 222, 33, 1) 20%,
//     rgba(79, 220, 74, 1) 30%,
//     rgba(63, 218, 216, 1) 40%,
//     rgba(47, 201, 226, 1) 50%,
//     rgba(28, 127, 238, 1) 60%,
//     rgba(95, 21, 242, 1) 70%,
//     rgba(186, 12, 248, 1) 80%,
//     rgba(251, 7, 217, 1) 90%,
//     rgba(255, 0, 0, 1) 100%
//   );
//   border-radius: 12px;
//   filter: blur(4px);
//   position: absolute;
//   top: -2px;
//   right: -2px;
//   bottom: -2px;
//   left: -2px;
//   z-index: -1;
// `;

const StyledCardSuperAccent = styled.div`
  background: linear-gradient(
    45deg,
    rgba(255, 0, 0, 1) 0%,
    rgba(255, 154, 0, 1) 10%,
    rgba(208, 222, 33, 1) 20%,
    rgba(79, 220, 74, 1) 30%,
    rgba(63, 218, 216, 1) 40%,
    rgba(47, 201, 226, 1) 50%,
    rgba(28, 127, 238, 1) 60%,
    rgba(95, 21, 242, 1) 70%,
    rgba(186, 12, 248, 1) 80%,
    rgba(251, 7, 217, 1) 90%,
    rgba(255, 0, 0, 1) 100%
  );
  border-radius: 12px;
  filter: blur(8px);
  position: absolute;
  top: -4px;
  right: -4px;
  bottom: -4px;
  left: -4px;
  z-index: -1;
`; // eslint-disable-line no-unused-vars

const StyledCards = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 900px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

// const StyledLoadingWrapper = styled.div`
//   align-items: center;
//   display: flex;
//   flex: 1;
//   justify-content: center;
// `;

const StyledRow = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
  flex-flow: row wrap;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const StyledCardWrapper = styled.div`
  display: flex;
  width: calc((900px - ${(props) => props.theme.spacing[4]}px * 2) / 2);
  position: relative;
  margin-bottom: 20px;
`;

const StyledContent = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
`;

const StyledSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`;

const StyledDetails = styled.div`
  margin-bottom: ${(props) => props.theme.spacing[2]}px;
  margin-top: ${(props) => props.theme.spacing[0]}px;
  text-align: center;
  color: #fff;
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const StyledInactiveNoticeContainer = styled.div`
  width: 598px;
  margin-bottom: ${(props) => props.theme.spacing[6]}px;
`;

const StyledInactiveLotteryTitle = styled.p`
  font-size: 24px;
  font-weight: 600;
  color: ${(props) => props.theme.color.grey[400]};
  margin-top: ${(props) => props.theme.spacing[5]}px;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
`;

export default LotteryCards;
