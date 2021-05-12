import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import Card from '../../../components/Card';
import CardContent from '../../../components/CardContent';
import Button from '../../../components/Button';
import Value from '../../../components/Value';
import Label from '../../../components/Label';
import useGoFarm from '../../../hooks/useGoFarm';
import useLotteryClaim from '../../../hooks/useLotteryClaim';
import { getDisplayBalance } from '../../../utils/formatBalance';
import { Lottery } from '../../../go-farm';
import { BigNumber } from 'ethers';

interface DrawedProps {
  lottery: Lottery;
  rewards: string[];
  rewardAmount: BigNumber[];
  rewardIndex: string[];
}

const Drawed: React.FC<DrawedProps> = ({ lottery, rewards, rewardAmount, rewardIndex }) => {
  const goFarm = useGoFarm();

  const { onClaim } = useLotteryClaim(lottery);

  const [numbers, setNumbers] = useState([]);
  const fetchStats = useCallback(async () => {
    let _numbers = [];
    const _ticketNumbers = await goFarm.getTicketNumbers(lottery.depositTokenName, rewards);
    for (let j = 0; j < _ticketNumbers.length; j++) {
      _numbers[j] = [];
      for (let k = 0; k < _ticketNumbers[j].length; k++) {
        _numbers[j][k] = _ticketNumbers[j][k];
      }
    }
    setNumbers(_numbers);
  }, [goFarm, lottery, rewards, setNumbers]);

  useEffect(() => {
    if (goFarm) {
      fetchStats().catch((err) => console.error(err.stack));
    }
  }, [goFarm, fetchStats]);

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <Label text={`🎉prize number🎉`} />
          <StyledCardHeader></StyledCardHeader>
        </StyledCardContentInner>
        <StyledCardContentInner>
          {numbers.map((ticket, i) => (
            <React.Fragment key={'ticket_' + i}>
              <StyledCardContentInner>
                <StyledCardHeader>
                  {ticket.map((tt: string, j: number) => (
                    <Value value={tt} key={'number_' + j} />
                  ))}
                </StyledCardHeader>
                <Label
                  text={`#${rewardIndex[i]}period,bonus${getDisplayBalance(
                    rewardAmount[i],
                    lottery.depositToken.decimal,
                    2,
                  )}`}
                />
              </StyledCardContentInner>
              <Button onClick={() => onClaim(rewards[i])} text={'Receive award'} />
            </React.Fragment>
          ))}
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

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

export default Drawed;
