import React , { useCallback, useEffect, useState }from 'react';
import styled from 'styled-components';

import Card from '../../../components/Card';
import CardContent from '../../../components/CardContent';
import Label from '../../../components/Label';
import Value from '../../../components/Value';
import useGoFarm from '../../../hooks/useGoFarm';
import { Lottery } from '../../../go-farm';

interface HistoryProps {
  lottery: Lottery;
}

const History: React.FC<HistoryProps> = ({ lottery }) => {
  const goFarm = useGoFarm();


  const [numbers, setNumbers] = useState(['0','0','0','0']);

  const fetchStats = useCallback(async () => {
    const _numbers = await goFarm.ticketNumbers(lottery.depositTokenName);
    setNumbers(_numbers);
  }, [goFarm, setNumbers,lottery]);

  useEffect(() => {
    if (goFarm) {
      fetchStats().catch((err) => console.error(err.stack));
    }
  }, [goFarm, fetchStats]);


  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
            <Label text={`Winning numbers in the previous period`} />
          <StyledCardHeader>
            <Value value={numbers[0]} />
            <Value value={numbers[1]} />
            <Value value={numbers[2]} />
            <Value value={numbers[3]} />
          </StyledCardHeader>
        </StyledCardContentInner>
      </CardContent>
    </Card>
  );
};

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
`;

export default History;
