import { Provider, RootStateOrAny } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Action, applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware, { ThunkMiddleware } from 'redux-thunk';
import './App.css';
import LandingPage from './components/BoosterPicker/LandingPage';
import Draft from './components/Draft/Draft';
import DraftComplete from './components/DraftComplete/DraftComplete';
import NavBar from './components/NavBar/NavBar';
import SealedBoosterOpener from './components/SealedBoosterOpener/SealedBoosterOpener';
import { initState, rootReducer } from './data/reducers';
import ToastManager from './components/ToastManager/ToastManager';

// undefined if browser does not have redux devtools installed
const reduxDevtoolsCompose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const enhancersThunk = applyMiddleware(thunkMiddleware as ThunkMiddleware<RootStateOrAny, Action>)

const store = createStore(
  rootReducer,
  initState as any,
  compose(enhancersThunk, ...reduxDevtoolsCompose ? [reduxDevtoolsCompose()] : [], )
);

function App() {
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
