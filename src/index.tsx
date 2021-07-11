import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider, RootStateOrAny } from 'react-redux';
import { applyMiddleware, Action, createStore, compose } from 'redux';
import { rootReducer, initState } from './data/reducers';
import thunkMiddleware, { ThunkMiddleware } from 'redux-thunk';

// undefined if browser does not have redux devtools installed
const reduxDevtoolsCompose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const enhancersThunk = applyMiddleware(thunkMiddleware as ThunkMiddleware<RootStateOrAny, Action>)

const store = createStore(
  rootReducer,
  initState as any,
  compose(enhancersThunk, ...reduxDevtoolsCompose ? [reduxDevtoolsCompose()] : [], )
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
