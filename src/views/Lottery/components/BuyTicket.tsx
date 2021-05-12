import React from 'react';
import styled from 'styled-components';

import Card from '../../../components/Card';
import CardContent from '../../../components/CardContent';
import CardIcon from '../../../components/CardIcon';
import Label from '../../../components/Label';
import Value from '../../../components/Value';
import useGoFarm from '../../../hooks/useGoFarm';
import useModal from '../../../hooks/useModal';
import Button from '../../../components/Button';
import useLotteryTimes from '../../../hooks/useLotteryTimes';

import useApprove, { ApprovalState } from '../../../hooks/useApprove';
import useTicketBuy from '../../../hooks/useTicketBuy';

import TokenSymbol from '../../../components/TokenSymbol';
import { Lottery } from '../../../go-farm';
import BuyModal from './BuyModal';

interface BuyTicketProps {
  lottery: Lottery;
  numbers: string[][];
  tickets: string[];
}

const BuyTicket: React.FC<BuyTicketProps> = ({ lottery,tickets,numbers }) => {
  const goFarm = useGoFarm();
  
  const { epoch } = useLotteryTimes();
  const { onTicketBuy } = useTicketBuy(lottery);
  const [approveStatus, approve] = useApprove(
    lottery.depositToken,
    goFarm?.contracts['Lottery_' + lottery.depositTokenName].address,
  );
  

  const [onPresentBuy, onDismissDeposit] = useModal(
    <BuyModal
      onConfirm={(val0, val1, val2, val3) => {
        onTicketBuy(val0, val1, val2, val3);
        onDismissDeposit();
      }}
      tokenName={lottery.depositTokenName}
    />,
  );

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <CardIcon>
              <TokenSymbol symbol={lottery.earnToken.symbol} />
            </CardIcon>
            <LabelItem>
              <Label text={`Your current issue ${lottery.depositTokenName} Ferry ticket:`} />
              <Value value={tickets.length.toString()} />
            </LabelItem>
          </StyledCardHeader>
          <StyledTickets>
            {numbers.map((ticket, i) => (
              <React.Fragment key={'ticket_' + i}>
                <TicketRow>
                  <Label text={`Ferry ticket(${tickets[i]}):`} />
                  {ticket.map((tt: string, j: number) => (
                    <React.Fragment key={'number_' + j}>
                      <TicketItem>{tt}</TicketItem>
                    </React.Fragment>
                  ))}
                </TicketRow>
              </React.Fragment>
            ))}
          </StyledTickets>

          <StyledCardActions>
            {approveStatus === ApprovalState.APPROVED ? (
              <Button
                //disabled={epoch !== 0}
                onClick={() => onPresentBuy()}
                //onClick={() => (epoch !== 0 ? null : onPresentBuy())}
                text={epoch === 0 ? 'Buy ferry tickets' : 'Wait for the next round to start'}
              />
            ) : (
              <Button
                disabled={
                  approveStatus === ApprovalState.PENDING ||
                  approveStatus === ApprovalState.UNKNOWN
                }
                onClick={approve}
                text={`Approve ${lottery.depositTokenName}`}
              />
            )}
          </StyledCardActions>
         
        </StyledCardContentInner>
      </CardContent>
    </Card>
  );
};
const LabelItem = styled.div`
  margin-left: 15px;
`;
const StyledCardHeader = styled.div`
  align-items: flex-start;
  display: flex;
  width: 100%;
`;
const TicketRow = styled.div`
  align-items: flex-start;
  display: flex;
  width: 100%;
`;
const TicketItem = styled.div`
  align-items: flex-start;
  display: flex;
  color: #fff;
  margin: 0px 10px;
`;
const StyledTickets = styled.div`
  align-items: flex-start;
  display: flex;
  width: 100%;
  flex-direction: column;
  overflow-y: scroll;
  max-height: 150px;
`;
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[1]}px;
  width: 100%;
`;

// const StyledActionSpacer = styled.div`
//   height: ${(props) => props.theme.spacing[4]}px;
//   width: ${(props) => props.theme.spacing[4]}px;
// `;
// const StyledSpacer = styled.div`
//   height: ${(props) => props.theme.spacing[4]}px;
//   width: ${(props) => props.theme.spacing[4]}px;
// `;

const StyledCardContentInner = styled.div`
  align-items: flex-start;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export default BuyTicket;
