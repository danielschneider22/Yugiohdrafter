import { Provider } from 'react-redux';
import './App.css';
import { createStore } from 'redux'
import { initState, rootReducer } from './data/reducers';
import SealedBoosterOpener from './components/SealedBoosterOpener/SealedBoosterOpener';
import LandingPage from './components/BoosterPicker/LandingPage';
import { useState } from 'react';
import Draft from './components/Draft/Draft';
// import './bootstrap.min.css';

// undefined if browser does not have redux devtools installed
const reduxDevtoolsCompose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const store = createStore(
  rootReducer,
  initState as any,
  ...reduxDevtoolsCompose ? [reduxDevtoolsCompose()] : [],
);

function App() {
  const [page, changePage] = useState("LandingPage")

  return (
    <Provider store={store}>
      <div className={"AppWrapper maxWH"}>
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
        { page === "Draft" && 
          <Draft 
            changePage={changePage}
          />
        }
      </div>
      
    </Provider>
  );
}

export default App;
