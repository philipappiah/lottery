import React from 'react';
import styled from 'styled-components';

import Button from '../../../components/Button';
import Card from '../../../components/Card';
import CardContent from '../../../components/CardContent';
import CardIcon from '../../../components/CardIcon';
import { AddIcon, RemoveIcon } from '../../../components/icons';
import IconButton from '../../../components/IconButton';
import Label from '../../../components/Label';
import Value from '../../../components/Value';

import useApprove, { ApprovalState } from '../../../hooks/useApprove';
import useModal from '../../../hooks/useModal';
import useStake from '../../../hooks/useStakeV2';
import useStakedBalance from '../../../hooks/useStakedBalanceV2';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useWithdraw from '../../../hooks/useWithdrawV2';

import { getDisplayBalance } from '../../../utils/formatBalance';

import DepositModal from './DepositModal';
import WithdrawModal from './WithdrawModal';
import TokenSymbol from '../../../components/TokenSymbol';
import { Farm } from '../../../go-farm';

interface StakeProps {
  farm: Farm;
}

const Stake: React.FC<StakeProps> = ({ farm }) => {
  const [approveStatus, approve] = useApprove(farm.depositToken, farm.address);

  // TODO: reactive update of token balance
  const tokenBalance = useTokenBalance(farm.depositToken);
  const stakedBalance = useStakedBalance(farm.pid);

  const { onStake } = useStake(farm);
  const { onWithdraw } = useWithdraw(farm);

  const [onPresentDeposit, onDismissDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      decimals={farm.depositToken.decimal}
      onConfirm={(amount) => {
        onStake(amount);
        onDismissDeposit();
      }}
      tokenName={farm.depositTokenName}
    />,
  );

  const [onPresentWithdraw, onDismissWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      decimals={farm.depositToken.decimal}
      onConfirm={(amount) => {
        onWithdraw(amount);
        onDismissWithdraw();
      }}
      tokenName={farm.depositTokenName}
    />,
  );

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <LogoCard>
            <CardIcon>
              <TokenSymbol symbol={farm.TokenA} size={54} />
            </CardIcon>
            <CardIcon>
              <TokenSymbol symbol={farm.TokenB} size={54} />
            </CardIcon>
            </LogoCard>
            <Value value={getDisplayBalance(stakedBalance, farm.depositToken.decimal)} />
            <Label text={`质押的${farm.depositTokenName}`} />
          </StyledCardHeader>
          <StyledCardActions>
            {approveStatus !== ApprovalState.APPROVED ? (
              <Button
                disabled={
                  approveStatus === ApprovalState.PENDING ||
                  approveStatus === ApprovalState.UNKNOWN
                }
                onClick={approve}
                text={`批准 ${farm.depositTokenName}`}
              />
            ) : (
              <>
                <IconButton onClick={onPresentWithdraw}>
                  <RemoveIcon />
                </IconButton>
                <StyledActionSpacer />
                <IconButton
                  disabled={farm.finished}
                  onClick={() => (farm.finished ? null : onPresentDeposit())}
                >
                  <AddIcon />
                </IconButton>
              </>
            )}
          </StyledCardActions>
        </StyledCardContentInner>
      </CardContent>
    </Card>
  );
};


const LogoCard = styled.div`
  display: flex;
`;
const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[6]}px;
  width: 100%;
`;

const StyledActionSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`;

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export default Stake;
