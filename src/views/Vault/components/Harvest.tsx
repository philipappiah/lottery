import React from 'react';
import styled from 'styled-components';

// import { Contract } from 'ethers';
import Card from '../../../components/Card';
import CardContent from '../../../components/CardContent';
import CardIcon from '../../../components/CardIcon';
import Label from '../../../components/Label';
import Value from '../../../components/Value';
import IconButton from '../../../components/IconButton';
import useGoFarm from '../../../hooks/useGoFarm';
import useModal from '../../../hooks/useModal';
import { RemoveIcon } from '../../../components/icons';

import useVaultEarnings from '../../../hooks/useVaultEarnings';
import useVaultStakedBalance from '../../../hooks/useVaultStakedBalance';
import useVaultWithdraw from '../../../hooks/useVaultWithdraw';

import { getDisplayBalance } from '../../../utils/formatBalance';
import TokenSymbol from '../../../components/TokenSymbol';
import { Vault } from '../../../go-farm';
import WithdrawModal from './WithdrawModal';

interface HarvestProps {
  vault: Vault;
}

const Harvest: React.FC<HarvestProps> = ({ vault }) => {
  const goFarm = useGoFarm();
  const earnings = useVaultEarnings(vault.depositTokenName);
  const stakedBalance = useVaultStakedBalance(vault.depositTokenName);
  const { onWithdraw } = useVaultWithdraw(vault);
  


  const [onPresentWithdraw, onDismissWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      decimals={vault.depositToken.decimal}
      onConfirm={(amount) => {
        onWithdraw(amount);
        onDismissWithdraw();
      }}
      tokenName={vault.depositTokenName}
    />,
  );

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <CardIcon>
              <TokenSymbol symbol={vault.earnToken.symbol} />
            </CardIcon>
            <Value value={getDisplayBalance(earnings,goFarm?.externalTokens[vault.depositTokenName].decimal)} />
            <Label text={`赚到的${vault.depositTokenName}`} />
          </StyledCardHeader>
          <StyledCardActions>
          {earnings.gt(0) && (
                <IconButton onClick={onPresentWithdraw}>
                  <RemoveIcon />
                </IconButton>
            )}
          </StyledCardActions>
        </StyledCardContentInner>
      </CardContent>
    </Card>
  );
};

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
// const StyledSpacer = styled.div`
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

export default Harvest;
