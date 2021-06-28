import './App.css';

import { useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { createStore } from 'redux';

import LandingPage from './components/BoosterPicker/LandingPage';
import Draft from './components/Draft/Draft';
import DraftComplete from './components/DraftComplete/DraftComplete';
import NavBar from './components/NavBar/NavBar';
import SealedBoosterOpener from './components/SealedBoosterOpener/SealedBoosterOpener';
import { initState, rootReducer } from './data/reducers';

// undefined if browser does not have redux devtools installed
const reduxDevtoolsCompose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const store = createStore(
  rootReducer,
  initState as any,
  ...reduxDevtoolsCompose ? [reduxDevtoolsCompose()] : [],
);

function App() {
  return (
    <Provider store={store}>
      <div className={"AppWrapper maxWH"}>
        <Router>
          <NavBar />
          <Route path="/Draft">
            <Draft />
          </Route>
          <Route path="/DraftComplete">
            <DraftComplete />
          </Route>
          <Route path="/SealedBooster">
            <SealedBoosterOpener />
          </Route>
          <Route path="/">
            <LandingPage />
          </Route>
        </Router>
      </div>
      
    </Provider>
  );
}

export default App;
