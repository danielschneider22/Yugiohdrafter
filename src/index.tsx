import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, RootStateOrAny } from 'react-redux';
import { Action, applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware, { ThunkMiddleware } from 'redux-thunk';
import App from './App';
import { initialState, rootReducer } from './data/reducers';
import './index.css';
import reportWebVitals from './reportWebVitals';

// undefined if browser does not have redux devtools installed
const reduxDevtoolsCompose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const enhancersThunk = applyMiddleware(thunkMiddleware as ThunkMiddleware<RootStateOrAny, Action>)
const cacheReduxMiddleware = (store: any) => (next: any) => (action: any) => { 
  const state = store.getState()
  localStorage.setItem('yugiohdrafter.com-state', JSON.stringify(state))
  
  const result = next(action)
  return result
}

const store = createStore(
  rootReducer,
  initialState() as any,
  compose(
    enhancersThunk,
    ...reduxDevtoolsCompose ? [reduxDevtoolsCompose()] : [],
    applyMiddleware(cacheReduxMiddleware),
  )
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
