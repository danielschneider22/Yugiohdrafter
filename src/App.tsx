import { Provider } from 'react-redux';
import './App.css';
import { createStore } from 'redux'
import { initState, rootReducer } from './data/reducers';
import SealedBoosterOpener from './components/SealedBoosterOpener/SealedBoosterOpener';
import LandingPage from './components/BoosterPicker/LandingPage';
import { useState } from 'react';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const store = createStore(
  rootReducer,
  initState,
  composeEnhancers(),
);

function App() {
  const [page, changePage] = useState("LandingPage")

  return (
    <Provider store={store}>
      { page === "LandingPage" && 
        <LandingPage 
          changePage={changePage}
        />
      }
      { page === "SealedBooster" && 
        <SealedBoosterOpener 
          changePage={changePage}
        />
      }
      
    </Provider>
  );
}

export default App;
