import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import Spacer from '../../components/Spacer';
import HomeCard from './components/HomeCard';
import { OverviewData } from './types';
import useGoFarm from '../../hooks/useGoFarm';
import background_1 from '../../assets/img/background_2.jpg';
import { BigNumber } from 'ethers';
import moment from 'moment';
import useStartTime from '../../hooks/useStartTime';

const Home: React.FC = () => {
  const goFarm = useGoFarm();

  const [{ GOT }, setStats] = useState<OverviewData>({});
  const [tvl, setTvl] = useState<BigNumber>(BigNumber.from(0));
  const fetchStats = useCallback(async () => {
    const [GOT, tvl] = await Promise.all([goFarm.getGOTStatFromUniswap(), goFarm.getTvl()]);
    setStats({ GOT });
    setTvl(tvl);
  }, [goFarm, setStats]);

  useEffect(() => {
    if (goFarm) {
      fetchStats().catch((err) => console.error(err.stack));
    }
  }, [goFarm, fetchStats]);

  const GOTAddr = useMemo(() => goFarm?.externalTokens['GOT'].address, [goFarm]);


  const { startTime } = useStartTime();

  
  const deadline = useMemo(() => moment(startTime).add(1, 'second').toDate(), [startTime]);
  
  return (
    <Background>
      <Page>
        <PageHeader
          // icon={<img src={require("../../assets/img/goCash (3).png")} width="80%" alt="goCash" height="100%"/>}
          subtitle="in Go Swap Provide liquidity, earn Go Swap Token"
          title="Welcome to interstellar farm!"
        />
        <Spacer size="md" />
        <CardWrapper>
          <HomeCard
            title="Go Swap Token"
            symbol="GOT"
            color="#ECF25C"
            supplyLabel="Circulating supply"
            startTime={deadline}
            address={GOTAddr}
            stat={GOT}
            tvl={tvl}
          />
        </CardWrapper>
      </Page>
    </Background>
  );
};

// const StyledOverview = styled.div`
//   align-items: center;
//   display: flex;
//   @media (max-width: 768px) {
//     width: 100%;
//     flex-flow: column nowrap;
//     align-items: center;
//   }
// `;

const Background = styled.div`
background: url(${background_1});
background-repeat: no-repeat;
background-attachment: fixed;
background-size: cover;
  }
`;
const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

// const StyledNoticeContainer = styled.div`
//   max-width: 768px;
//   width: 90vw;
// `;

// const StyledSpacer = styled.div`
//   height: ${(props) => props.theme.spacing[4]}px;
//   width: ${(props) => props.theme.spacing[4]}px;
// `;

// const StyledLink = styled.a`
//   font-weight: 700;
//   text-decoration: none;
//   color: ${(props) => props.theme.color.primary.main};
// `;

export default Home;
