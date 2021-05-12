import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import Card from '../../../components/Card';
import CardContent from '../../../components/CardContent';
import useGoFarm from '../../../hooks/useGoFarm';
import { getDisplayBalance } from '../../../utils/formatBalance';
import { BigNumber } from 'ethers';
import { TotalPot, Allocations } from '../../../go-farm/types';

import { Lottery } from '../../../go-farm';

interface PotsProps {
  lottery: Lottery;
}

const Pots: React.FC<PotsProps> = ({ lottery }) => {
  const goFarm = useGoFarm();

  const [totalPot, setStats] = useState<TotalPot>({
    MTR: BigNumber.from(0),
    MUSD: BigNumber.from(0),
  });

  const [allocations, setAllocations] = useState<Allocations>({
    MTR: [ BigNumber.from(0),  BigNumber.from(0),  BigNumber.from(0)],
    MUSD: [ BigNumber.from(0),  BigNumber.from(0),  BigNumber.from(0)],
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
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledDetails>
          Prize pool for this issue:
            {lottery.depositTokenName.includes('MUSD')
              ? getDisplayBalance(totalPot.MTR, 18, 2)
              : getDisplayBalance(totalPot.MUSD, 8, 2)}
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
            <StyledDetailsItem>Second prize:</StyledDetailsItem>
            <StyledDetailsItem>
              {lottery.depositTokenName.includes('MUSD')
                ? getDisplayBalance(totalPot.MUSD.mul(allocations.MUSD[1]).div(100), 18, 2)
                : getDisplayBalance(totalPot.MTR.mul(allocations.MTR[1]).div(100), 8, 2)}
            </StyledDetailsItem>
          </StyledDetails>
          <StyledDetails>
            <StyledDetailsItem>Third prize:</StyledDetailsItem>
            <StyledDetailsItem>
              {lottery.depositTokenName.includes('MUSD')
                ? getDisplayBalance(totalPot.MUSD.mul(allocations.MUSD[2]).div(100), 18, 2)
                : getDisplayBalance(totalPot.MTR.mul(allocations.MTR[2]).div(100), 8, 2)}
            </StyledDetailsItem>
          </StyledDetails>
          <StyledDetails>
            <StyledDetailsItem>
              {lottery.depositTokenName.includes('MUSD') ? `Repurchase MUSD:` : `Invest in the MUSD prize pool:`}
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
        </StyledCardContentInner>
      </CardContent>
    </Card>
  );
};

const StyledDetailsItem = styled.div`
  display: flex;
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

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export default Pots;
