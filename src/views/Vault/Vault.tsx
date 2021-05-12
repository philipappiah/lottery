import React from 'react';
import styled from 'styled-components';

import { useParams } from 'react-router-dom';
import { useWallet } from 'use-wallet';

import Button from '../../components/Button';
import PageHeader from '../../components/PageHeader';
import Label from '../../components/Label';
import Spacer from '../../components/Spacer';
import Harvest from './components/Harvest';
import Stake from './components/Stake';
import useVault from '../../hooks/useVault';
import useVaultRedeem from '../../hooks/useVaultRedeem';

const Vault: React.FC = () => {
  // useEffect(() => window.scrollTo(0, 0));

  const { vaultId } = useParams();
  const vault = useVault(vaultId);
  const { account } = useWallet();
  const { onRedeem } = useVaultRedeem(vault);

  return account && vault ? (
    <>
      <PageHeader
        // icon={<img src={require("../../assets/img/farm.png")} width="80%" height="90%" alt="farms" style={{position: "absolute",top: "5%",left:"10%"}}/>}
        subtitle={`存入 ${vault?.depositTokenName} 赚取 ${vault?.depositTokenName}`}
        title={vault?.name}
      />
      <StyledBank>
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <Harvest vault={vault} />
          </StyledCardWrapper>
          <Spacer />
          <StyledCardWrapper>
            <Stake vault={vault} />
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer size="lg" />
        <div>
          <Label color={'#000'} text={`g${vault.depositTokenName}数量代表存款凭证的数量,存入后不会产生变化`} />
          <Button onClick={onRedeem} text="取出全部资产" />
        </div>
        <Spacer size="lg" />
      </StyledBank>
    </>
  ) : !vault ? (
    <BankNotFound />
  ) : (
    <UnlockWallet />
  );
};


const BankNotFound = () => {
  return (
    <Center>
      <PageHeader
        icon="🏚"
        title="没有弹药"
        subtitle="目前禁止开火"
      />
    </Center>
  );
};

const UnlockWallet = () => {
  const { connect } = useWallet();
  return (
    <Center>
      <Button onClick={() => connect('injected')} text="解锁钱包" />
    </Center>
  );
};
// const StyledIcon = styled.div`
//   font-size: 28px;
//   width:24px;
//   height:24px;
//   padding-left:10px;
//   padding-right:5px;
// `;
const StyledBank = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

// const StyledUniswapLPGuide = styled.div`
//   margin: -24px auto 48px;
// `;

// const StyledLink = styled.a`
//   font-weight: 700;
//   text-decoration: none;
//   display: inherit;
//   color: ${(props) => props.theme.color.primary.main};
// `;

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

const Center = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default Vault;
