import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import Card from '../../../components/Card';
import CardContent from '../../../components/CardContent';
import SearchInput from '../../../components/SearchInput';
import Value from '../../../components/Value';
import Label from '../../../components/Label';
import useGoFarm from '../../../hooks/useGoFarm';
import { getDisplayBalance } from '../../../utils/formatBalance';
import { Lottery } from '../../../go-farm';
import { BigNumber } from 'ethers';

interface HistoryProps {
  lottery: Lottery;
}

const History: React.FC<HistoryProps> = ({ lottery }) => {
  const goFarm = useGoFarm();

  const [issueIndex, setIssueIndex] = useState('0');
  const [numbers, setNumbers] = useState(['0', '0', '0', '0']);
  const fetchStats = useCallback(async () => {
    const _issueIndex = await goFarm.getIssueIndex(lottery.depositTokenName);
    setIssueIndex(_issueIndex);
    handleSearch(_issueIndex);
  }, [goFarm, setIssueIndex, lottery]);

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setIssueIndex(e.currentTarget.value);
    },
    [setIssueIndex],
  );

  useEffect(() => {
    if (goFarm) {
      fetchStats().catch((err) => console.error(err.stack));
    }
  }, [goFarm, fetchStats]);

  const handleSearch = useCallback(async (issueIndex) => {
    console.log('issueIndex', issueIndex);
    const [_numbers, _historyAmount, _allocations] = await Promise.all([
      goFarm.historyNumbers(lottery.depositTokenName, issueIndex),
      goFarm.getHistoryAmount(lottery.depositTokenName, issueIndex),
      goFarm.getAllcationByName(lottery.depositTokenName),
    ]);
    console.log('_numbers', _numbers);
    console.log('_historyAmount', _historyAmount);
    console.log('_allocations', _allocations);
    setNumbers(_numbers);
    if(Number(_historyAmount[0]) > 0) setStats(_historyAmount);
    setAllocations(_allocations);
  }, [setIssueIndex]);

  const [historyAmount, setStats] = useState(['0','0','0','0']);

  const [allocations, setAllocations] = useState(['0','0','0']);

  const decimal = lottery.depositToken.decimal

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <Label text={`Query past data`} />
          <StyledCardHeader>
            <SearchInput value={issueIndex} onSearch={()=>handleSearch(issueIndex)} onChange={handleChange} />
          </StyledCardHeader>
        </StyledCardContentInner>
        <StyledCardContentInner>
          <StyledCardContentInner>
            <Label text={`#${issueIndex}prize number`} />
            <StyledCardHeader>
              <Value value={numbers[0]} />
              <Value value={numbers[1]} />
              <Value value={numbers[2]} />
              <Value value={numbers[3]} />
            </StyledCardHeader>
          </StyledCardContentInner>
          <StyledDetails>
          Total prize pool: {" "}
            {getDisplayBalance(BigNumber.from(historyAmount[0]), decimal, 2)}
            {lottery.depositTokenName}
          </StyledDetails>
          <StyledDetails>
            <StyledDetailsItem>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</StyledDetailsItem>
            <StyledDetailsItem>
            Number of winners:
            </StyledDetailsItem>
            <StyledDetailsItem>
            Prize pool bonus:
            </StyledDetailsItem>
          </StyledDetails>
          <StyledDetails>
            <StyledDetailsItem>First prize:</StyledDetailsItem>
            <StyledDetailsItem>
              {getDisplayBalance(BigNumber.from(historyAmount[1]), decimal, 0)}
            </StyledDetailsItem>
            <StyledDetailsItem>
              {getDisplayBalance(BigNumber.from(historyAmount[0]).mul(allocations[0]).div(100), decimal, 2)}
            </StyledDetailsItem>
          </StyledDetails>
          <StyledDetails>
            <StyledDetailsItem>second prize:</StyledDetailsItem>
            <StyledDetailsItem>
              {getDisplayBalance(BigNumber.from(historyAmount[2]), decimal, 0)}
            </StyledDetailsItem>
            <StyledDetailsItem>
              {getDisplayBalance(BigNumber.from(historyAmount[0]).mul(allocations[1]).div(100), decimal, 2)}
            </StyledDetailsItem>
          </StyledDetails>
          <StyledDetails>
            <StyledDetailsItem>Third prize:</StyledDetailsItem>
            <StyledDetailsItem>
              {getDisplayBalance(BigNumber.from(historyAmount[3]), decimal, 0)}
            </StyledDetailsItem>
            <StyledDetailsItem>
              {getDisplayBalance(BigNumber.from(historyAmount[0]).mul(allocations[2]).div(100), decimal, 2)}
            </StyledDetailsItem>
          </StyledDetails>
          <StyledDetails>
            <StyledDetailsItem>
              {lottery.depositTokenName.includes('GOC') ? `Repurchase MTRG:` : `Invest in the MTR prize pool:`}
            </StyledDetailsItem>
            <StyledDetailsItem>
              {getDisplayBalance(
                BigNumber.from(historyAmount[0])
                  .mul(100 - Number(allocations[0]) - Number(allocations[1]) - Number(allocations[2]))
                  .div(100),
                decimal,
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

export default History;
