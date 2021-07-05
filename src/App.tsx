import { Provider, RootStateOrAny } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Action, applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware, { ThunkMiddleware } from 'redux-thunk';
import './App.css';
import LandingPage from './components/BoosterPicker/LandingPage';
import Draft from './components/Draft/Draft';
import DraftComplete from './components/DraftComplete/DraftComplete';
import NavBar from './components/NavBar/NavBar';
import RoomPage from './components/RoomPage/RoomPage';
import SealedBoosterOpener from './components/SealedBoosterOpener/SealedBoosterOpener';
import { initState, rootReducer } from './data/reducers';
import ToastManager from './components/ToastManager/ToastManager';
import { useEffect } from 'react';
import { getClientIp } from './data/data/rooms/utils';

// undefined if browser does not have redux devtools installed
const reduxDevtoolsCompose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const enhancersThunk = applyMiddleware(thunkMiddleware as ThunkMiddleware<RootStateOrAny, Action>)

const store = createStore(
  rootReducer,
  initState as any,
  compose(enhancersThunk, ...reduxDevtoolsCompose ? [reduxDevtoolsCompose()] : [], )
);

export let ip = ""

async function getIP() {
  ip = await getClientIp()
}

function App() {
  useEffect(() => {
    getIP()
  })
  return (
    <Provider store={store}>
      <ToastManager
        position="bottom-left"
        autoDelete={true}
        dismissTime={6000}
      />
      <div className={"AppWrapper maxWH"}>
        <Router>
            <NavBar />
            <Switch>
              <Route path="/Draft">
                <Draft />
              </Route>
              <Route path="/DraftComplete">
                <DraftComplete />
              </Route>
              <Route path="/SealedBooster">
                <SealedBoosterOpener />
              </Route>
              <Route path={`/room/:id`}>
                <RoomPage />
              </Route>
            <Route path="/">
              <LandingPage />
            </Route>
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
