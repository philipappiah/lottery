import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { UseWalletProvider } from 'use-wallet';

import FarmsProvider from './contexts/Farms';
import VaultsProvider from './contexts/Vaults';
import LotterysProvider from './contexts/Lotterys';
import FarmsV2Provider from './contexts/FarmsV2';
import GoFarmProvider from './contexts/GoFarmProvider';
import ModalsProvider from './contexts/Modals';

import Farms from './views/Farms';
import FarmsV2 from './views/FarmsV2';
import Vaults from './views/Vaults';
import Lotterys from './views/Lotterys';
import Home from './views/Home';

import store from './state';
import theme from './theme';
import config from './config';
import Updaters from './state/Updaters';
import Popups from './components/Popups';

const App: React.FC = () => {
  return (
    <Providers>
      <Router basename="/">
        <Switch>
          <Route path="/" exact>
            <Lotterys />
          </Route>
          <Route path="/farm">
            <Farms />
          </Route>
          <Route path="/vault">
            <Vaults />
          </Route>
          <Route path="/lottery">
            <Lotterys />
          </Route>
          <Route path="/farmV2">
            <FarmsV2 />
          </Route>
        </Switch>
      </Router>
    </Providers>
  );
};

const Providers: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <UseWalletProvider chainId={config.chainId}>
        <Provider store={store}>
          <Updaters />
          <GoFarmProvider>
            <ModalsProvider>
              <FarmsProvider>
                <VaultsProvider>
                <FarmsV2Provider>
                  <LotterysProvider>
                    <>
                      <Popups />
                      {children}
                    </>
                  </LotterysProvider>
                </FarmsV2Provider>
                </VaultsProvider>
              </FarmsProvider>
            </ModalsProvider>
          </GoFarmProvider>
        </Provider>
      </UseWalletProvider>
    </ThemeProvider>
  );
};

export default App;