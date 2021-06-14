import { Provider } from 'react-redux';
import './App.css';
import { createStore } from 'redux'
import { initState, rootReducer } from './data/reducers';
import SealedBoosterOpener from './components/SealedBoosterOpener/SealedBoosterOpener';
import LandingPage from './components/BoosterPicker/LandingPage';
import { useState } from 'react';

function App() {

  const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  const store = createStore(
    rootReducer,
    initState,
    composeEnhancers(),
  );

  const [page, changePage] = useState("LandingPage")

  function launch() {
    changePage("SealedBooster")
  }

  return (
    <Provider store={store}>
      { page === "LandingPage" && 
        <LandingPage 
          launch={launch}
        />
      }
      { page === "SealedBooster" && 
        <SealedBoosterOpener />
      }
      
    </Provider>
  );
}

export default App;
