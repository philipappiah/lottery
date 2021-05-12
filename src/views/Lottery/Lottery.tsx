import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import { useParams } from 'react-router-dom';
import { useWallet } from 'use-wallet';

import Button from '../../components/Button';
import PageHeader from '../../components/PageHeader';
import Spacer from '../../components/Spacer';
import BuyTicket from './components/BuyTicket';
import Drawed from './components/Drawed';
import Reward from './components/Reward';
import Pots from './components/Pots';
import History from './components/History';
import useLottery from '../../hooks/useLottery';
import useGoFarm from '../../hooks/useGoFarm';
import config from '../../config';

const Lottery: React.FC = () => {
  const goFarm = useGoFarm();

  const { lotteryId } = useParams();
  const lottery = useLottery(lotteryId);
  const { account } = useWallet();

  const [rewards, setRewards] = useState([]);
  const [rewardAmount, setRewardAmount] = useState([]);
  const [rewardIndex, setRewardIndex] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const [tickets, setTickets] = useState([]);

  const fetchInfo = useCallback(async () => {
    const userInfo = await goFarm.getUserTicket(lottery.depositTokenName,goFarm?.myAccount);
    const issueIndex = await goFarm.getCurrentIssueIndex(lottery.depositTokenName);
    const _tickets = userInfo[0];
    const _issueIndex = userInfo[1];
    const _claimed = userInfo[2];
    const _reward = userInfo[3];
    let currentTickets = [];
    let _rewards = [];
    let _rewardAmount = [];
    let _numbers = [];
    let _rewardIndex = [];
    for (let i = 0; i < _tickets.length; i++) {
      if (Number(_issueIndex[i]) === Number(issueIndex)) {
        currentTickets.push(_tickets[i]);
      }
      if (Number(_reward[i]) > 0 && !_claimed[i]) {
        _rewards.push(_tickets[i]);
        _rewardAmount.push(_reward[i]);
        _rewardIndex.push(_issueIndex[i]);
      }
    }
    const _ticketNumbers = await goFarm.getTicketNumbers(
      lottery.depositTokenName,
      currentTickets,
    );
    for (let j = 0; j < _ticketNumbers.length; j++) {
      _numbers[j] = [];
      for (let k = 0; k < _ticketNumbers[j].length; k++) {
        _numbers[j][k] = _ticketNumbers[j][k];
      }
    }
    console.log('_rewards', _rewards);
    setTickets(currentTickets);
    setNumbers(_numbers);
    setRewards(_rewards);
    setRewardAmount(_rewardAmount);
    setRewardIndex(_rewardIndex);
  }, [goFarm, lottery, setTickets, setNumbers, setRewards, setRewardAmount, setRewardIndex]);

  useEffect(() => {
    if (goFarm?.myAccount) {
      fetchInfo().catch((err) => console.error(err.stack));
      const refreshBalance = setInterval(fetchInfo, config.refreshInterval);
      return () => clearInterval(refreshBalance);
    }
  }, [goFarm?.myAccount, fetchInfo]);
  return account && lottery ? (
    <>
      <PageHeader
        subtitle={`by ${lottery?.depositTokenName}Buy ferry tickets and have a chance to win big prizes`}
        title={lottery?.name}
      />
      <StyledBank>
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <BuyTicket lottery={lottery} tickets={tickets} numbers={numbers} />
          </StyledCardWrapper>
          <Spacer />
          <StyledCardWrapper2>
            <StyledCardWrapper>
              <Drawed lottery={lottery} />
            </StyledCardWrapper>
            <StyledCardWrapper>
              <Pots lottery={lottery} />
            </StyledCardWrapper>
          </StyledCardWrapper2>
        </StyledCardsWrapper>
        {rewards.length > 0 && (
          <React.Fragment>
            <Spacer />
            <StyledCardWrapper3>
              <Reward
                lottery={lottery}
                rewards={rewards}
                rewardAmount={rewardAmount}
                rewardIndex={rewardIndex}
              />
            </StyledCardWrapper3>
          </React.Fragment>
        )}
        <Spacer />
        <StyledCardWrapper3>
          <History lottery={lottery} />
        </StyledCardWrapper3>
        <Spacer size="lg" />
      </StyledBank>
    </>
  ) : (
    <UnlockWallet />
  );
};

const UnlockWallet = () => {
  const { connect } = useWallet();
  return (
    <Center>
      <Button onClick={() => connect('injected')} text="Unlock wallet" />
    </Center>
  );
};

const StyledBank = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 600px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`;
const StyledCardWrapper2 = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`;

const StyledCardWrapper3 = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
  width: 100%;
`;

const Center = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default Lottery;
