import { Provider } from 'react-redux';
import './App.css';
import { combineReducers, createStore } from 'redux'
import BoosterPicker from './components/BoosterPicker/BoosterPicker';
import cardSetsReducer, { cardSetsInitialState } from './data/cardSets/reducer';

export const initState = {
  cardSets: cardSetsInitialState,
}

// export const rootReducer = combineReducers({
//   cardSets: cardSetsReducer
// })

function App() {

  // const store = createStore(rootReducer);
  const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  const store = createStore(
    combineReducers({
      cardSets: cardSetsReducer
    }),
    initState,
    composeEnhancers(),
  );

  return (
    <Provider store={store}>
      <BoosterPicker />
    </Provider>
  );
}

export default App;
