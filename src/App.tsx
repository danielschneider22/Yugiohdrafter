import { Provider } from 'react-redux';
import './App.css';
import { combineReducers, createStore } from 'redux'
import cardSetsReducer, { cardSetsInitialState } from './data/cardSets/reducer';
import LandingPage from './components/BoosterPicker/LandingPage';
import { initState, rootReducer } from './data/reducers';

function App() {

  // const store = createStore(rootReducer);
  const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  const store = createStore(
    rootReducer,
    initState,
    composeEnhancers(),
  );

  return (
    <Provider store={store}>
      <LandingPage />
    </Provider>
  );
}

export default App;
