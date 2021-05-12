import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import FarmV2 from '../FarmV2';
import FarmCards from './FarmCards';
import { useWallet } from 'use-wallet';
import Button from '../../components/Button';
import styled from 'styled-components';
import background_2 from '../../assets/img/background_2.jpg';

const Farms: React.FC = () => {
  const { path } = useRouteMatch();
  const { account, connect } = useWallet();

  return (
    <Background>
    <Switch>
      <Page>
        <Route exact path={path}>
          <PageHeader
            // icon={<img src={require("../../assets/img/farms.png")} width="100%" height="48%" alt="farms" style={{position: "absolute",top: "35%",left:"0"}}/>}
            title="选择农场."
            subtitle="通过提供GoSwap流动性赚取收益"
          />
          {!!account ? (
            <FarmCards />
          ) : (
            <Center>
              <Button onClick={() => connect('injected')} text="解锁钱包" />
            </Center>
          )}
        </Route>
        <Route path={`${path}/:farmId`}>
          <FarmV2 />
        </Route>
      </Page>
    </Switch>
    </Background>
  );
};

const Background = styled.div`
background: url(${background_2});
background-repeat: no-repeat;
background-attachment: fixed;
width: 100%;
background-size: cover;
z-index: 0;
height: 100%;
position: relative;
  }
`;
const Center = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default Farms;
