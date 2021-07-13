import { Provider, RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
import { useEffect, useState } from 'react';
import { getClientIp } from './data/data/rooms/utils';
import RoomPage from './components/RoomPage/RoomPage';
import { getCardSetsById } from './data/cardSets/selectors';
import { addSets } from './data/cardSets/actions';
import { fetchCardSets } from './data/cardSets/operations';
import RoomDraft from './components/RoomDraft/RoomDraft';

export let ip = ""

function App() {
  const [ipLoaded, setIpLoaded] = useState(false)
  const cardSets = Object.values(useSelector(getCardSetsById))
  const dispatch = useDispatch();

  useEffect(() => {
    // get client's ip address
    async function getIP() {
      if(process.env.NODE_ENV === "development") {
        ip = (Math.random() * 200000) + ""
      } else {
        ip = await getClientIp()
      }
      
      setIpLoaded(true)
    }
    getIP()

    // fetch all card sets
    const sets = localStorage.getItem("cardSets");
    if(cardSets.length === 0 && sets) {
        dispatch(addSets(JSON.parse(sets)))
    } else if (cardSets.length === 0) {
        fetchCardSets(dispatch);
    }
  }, [])

  if(!ipLoaded || cardSets.length === 0) {
    return <div></div>
  }
  return (
    <div>
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
              <Route path={`/room/draft/:id`}>
                <RoomDraft />
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
    </div>
  );
}

export default App;

