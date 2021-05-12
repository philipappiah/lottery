import React from 'react';
import styled from 'styled-components';

import Button from '../../../components/Button';
import Card from '../../../components/Card';
import CardContent from '../../../components/CardContent';
import CardIcon from '../../../components/CardIcon';
import { AddIcon } from '../../../components/icons';
import IconButton from '../../../components/IconButton';
import Label from '../../../components/Label';
import Value from '../../../components/Value';
import useGoFarm from '../../../hooks/useGoFarm';

import useApprove, { ApprovalState } from '../../../hooks/useApprove';
import useModal from '../../../hooks/useModal';
import useVaultStake from '../../../hooks/useVaultStake';
import useVaultStakedBalance from '../../../hooks/useVaultStakedBalance';
import useTokenBalance from '../../../hooks/useTokenBalance';

import { getDisplayBalance } from '../../../utils/formatBalance';

import DepositModal from './DepositModal';
import TokenSymbol from '../../../components/TokenSymbol';
import { Vault } from '../../../go-farm';

interface StakeProps {
  vault: Vault;
}

const Stake: React.FC<StakeProps> = ({ vault }) => {
  const goFarm = useGoFarm();
  const [approveStatus, approve] = useApprove(
    vault.depositToken,
    goFarm?.contracts[vault.depositTokenName].address,
  );

  // TODO: reactive update of token balance
  const tokenBalance = useTokenBalance(vault.depositToken);
  const stakedBalance = useVaultStakedBalance(vault.depositTokenName);

  const { onStake } = useVaultStake(vault);

  const [onPresentDeposit, onDismissDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      decimals={vault.depositToken.decimal}
      onConfirm={(amount) => {
        onStake(amount);
        onDismissDeposit();
      }}
      tokenName={vault.depositTokenName}
    />,
  );

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <LogoCard>
              <CardIcon>
                <TokenSymbol symbol={vault.depositTokenName} size={54} />
              </CardIcon>
            </LogoCard>
            <Value value={getDisplayBalance(stakedBalance, vault.depositToken.decimal)} />
            <Label text={`存入的 g${vault.depositTokenName} 数量`} />
          </StyledCardHeader>
          <StyledCardActions>
            {approveStatus === ApprovalState.APPROVED ||  vault.depositTokenName === 'HT'? (
              <>
                <IconButton
                  disabled={vault.finished}
                  onClick={() => (vault.finished ? null : onPresentDeposit())}
                >
                  <AddIcon />
                </IconButton>
              </>
            ) : (
              <Button
                disabled={
                  approveStatus === ApprovalState.PENDING ||
                  approveStatus === ApprovalState.UNKNOWN
                }
                onClick={approve}
                text={`批准 ${vault.depositTokenName}`}
              />
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

// const StyledActionSpacer = styled.div`
//   height: ${(props) => props.theme.spacing[4]}px;
//   width: ${(props) => props.theme.spacing[4]}px;
// `;

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export default Stake;
