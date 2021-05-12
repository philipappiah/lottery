import React from 'react';
import styled from 'styled-components';

import { Farm } from '../../go-farm';
import Button from '../../components/Button';
import Card from '../../components/Card';
import CardContent from '../../components/CardContent';
import CardIcon from '../../components/CardIcon';
import useFarmsV2 from '../../hooks/useFarmsV2';
import TokenSymbol from '../../components/TokenSymbol';
import Notice from '../../components/Notice';
import { getDisplayBalance } from '../../utils/formatBalance';

const FarmCards: React.FC = () => {
  const [farmsV2] = useFarmsV2();

  const activeFarms = farmsV2.filter((farm) => !farm.finished);
  const inactiveFarms = farmsV2.filter((farm) => farm.finished);

  let finishedFirstRow = false;
  const inactiveRows = inactiveFarms.reduce<Farm[][]>(
    (farmRows, farm) => {
      const newFarmRows = [...farmRows];
      if (newFarmRows[newFarmRows.length - 1].length === (finishedFirstRow ? 2 : 3)) {
        newFarmRows.push([farm]);
        finishedFirstRow = true;
      } else {
        newFarmRows[newFarmRows.length - 1].push(farm);
      }
      return newFarmRows;
    },
    [[]],
  );

  return (
    <StyledCards>
      {inactiveRows[0].length > 0 && (
        <StyledInactiveNoticeContainer>
          <Notice color="grey">
            <b>You have farms where the mining has finished.</b>
            <br />
            Please withdraw and settle your stakes.
          </Notice>
        </StyledInactiveNoticeContainer>
      )}
      <StyledRow>
        {activeFarms.map((farm, i) => (
          <React.Fragment key={farm.name}>
            <FarmCard farm={farm} />
          </React.Fragment>
        ))}
      </StyledRow>
      {inactiveRows[0].length > 0 && (
        <>
          <StyledInactiveFarmTitle>Inactive Farms</StyledInactiveFarmTitle>
          {inactiveRows.map((farmRow, i) => (
            <StyledRow key={i}>
              {farmRow.map((farm, j) => (
                <React.Fragment key={j}>
                  <FarmCard farm={farm} />
                  {j < farmRow.length - 1 && <StyledSpacer />}
                </React.Fragment>
              ))}
            </StyledRow>
          ))}
        </>
      )}
    </StyledCards>
  );
};

interface FarmCardProps {
  farm: Farm;
}

const FarmCard: React.FC<FarmCardProps> = ({ farm }) => {
  return (
    <StyledCardWrapper>
      {farm.depositTokenName.includes('GOT_HUSD-LP') ? (
        <StyledCardSuperAccent />
      ) : (
        <StyledCardNomal />
      )}
      <Card>
        <CardContent>
          <StyledContent>
            <LogoCard>
              <CardIcon>
                <TokenSymbol symbol={farm.TokenA} size={54} />
              </CardIcon>
              {farm.TokenB !== 'VAULT' && (
                <CardIcon>
                  <TokenSymbol symbol={farm.TokenB} size={54} />
                </CardIcon>
              )}
              <StyledDetailIcon>存入 {farm.depositTokenName}</StyledDetailIcon>
            </LogoCard>
            <StyledDetail>
              <StyledDetail>存款额 ${getDisplayBalance(farm.poolPrice, 18, 0)}</StyledDetail>
              <StyledDetail>Apy {getDisplayBalance(farm.apy, 18, 2)}%</StyledDetail>
            </StyledDetail>
            <StyledDetail>
              <StyledDetail>赚取 {`${farm.earnTokenName}`}</StyledDetail>
              <StyledDetail>日产量 {getDisplayBalance(farm.alloc, 18, 0)} GOT</StyledDetail>
            </StyledDetail>
            <Button text="GO" to={`/farmV2/${farm.depositTokenName}`} width='initial' />
          </StyledContent>
        </CardContent>
      </Card>
    </StyledCardWrapper>
  );
};

const LogoCard = styled.div`
  display: flex;
`;
const StyledCardNomal = styled.div`
  border-radius: 12px;
  filter: blur(4px);
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: -1;
`;

// const StyledCardAccent = styled.div`
//   background: linear-gradient(
//     45deg,
//     rgba(255, 0, 0, 1) 0%,
//     rgba(255, 154, 0, 1) 10%,
//     rgba(208, 222, 33, 1) 20%,
//     rgba(79, 220, 74, 1) 30%,
//     rgba(63, 218, 216, 1) 40%,
//     rgba(47, 201, 226, 1) 50%,
//     rgba(28, 127, 238, 1) 60%,
//     rgba(95, 21, 242, 1) 70%,
//     rgba(186, 12, 248, 1) 80%,
//     rgba(251, 7, 217, 1) 90%,
//     rgba(255, 0, 0, 1) 100%
//   );
//   border-radius: 12px;
//   filter: blur(4px);
//   position: absolute;
//   top: -2px;
//   right: -2px;
//   bottom: -2px;
//   left: -2px;
//   z-index: -1;
// `;

const StyledCardSuperAccent = styled.div`
  background: linear-gradient(
    45deg,
    rgba(255, 0, 0, 1) 0%,
    rgba(255, 154, 0, 1) 10%,
    rgba(208, 222, 33, 1) 20%,
    rgba(79, 220, 74, 1) 30%,
    rgba(63, 218, 216, 1) 40%,
    rgba(47, 201, 226, 1) 50%,
    rgba(28, 127, 238, 1) 60%,
    rgba(95, 21, 242, 1) 70%,
    rgba(186, 12, 248, 1) 80%,
    rgba(251, 7, 217, 1) 90%,
    rgba(255, 0, 0, 1) 100%
  );
  border-radius: 12px;
  filter: blur(8px);
  position: absolute;
  top: -4px;
  right: -4px;
  bottom: -4px;
  left: -4px;
  z-index: -1;
`; // eslint-disable-line no-unused-vars

const StyledCards = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 924px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

// const StyledLoadingWrapper = styled.div`
//   align-items: center;
//   display: flex;
//   flex: 1;
//   justify-content: center;
// `;

const StyledRow = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
  flex-flow: row wrap;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const StyledCardWrapper = styled.div`
  display: flex;
  width: calc(900px - ${(props) => props.theme.spacing[4]}px * 2);
  position: relative;
  margin-bottom: 20px;
`;

const StyledContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-direction: row;
`;

const StyledSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`;

const StyledDetail = styled.div`
  color: ${(props) => props.theme.color.grey[300]};
  justify-content: center;
  display: flex;
  flex-direction: column;
`;
const StyledDetailIcon = styled.div`
  margin-left: ${(props) => props.theme.spacing[3]}px;
  color: ${(props) => props.theme.color.grey[300]};
  line-height: 60px;
`;

const StyledInactiveNoticeContainer = styled.div`
  width: 598px;
  margin-bottom: ${(props) => props.theme.spacing[6]}px;
`;

const StyledInactiveFarmTitle = styled.p`
  font-size: 24px;
  font-weight: 600;
  color: ${(props) => props.theme.color.grey[400]};
  margin-top: ${(props) => props.theme.spacing[5]}px;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
`;

export default FarmCards;
