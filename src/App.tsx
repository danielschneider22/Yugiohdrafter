import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import LandingPage from './components/BoosterPicker/LandingPage';
import Draft from './components/Draft/Draft';
import DraftComplete from './components/DraftComplete/DraftComplete';
import NavBar from './components/NavBar/NavBar';
import SealedBoosterOpener from './components/SealedBoosterOpener/SealedBoosterOpener';
import ToastManager from './components/ToastManager/ToastManager';
import { useEffect, useState } from 'react';
import { getClientIp } from './data/data/rooms/utils';
import RoomPage from './components/RoomPage/RoomPage';
import { getCardSetsById } from './data/cardSets/selectors';
import { addSets } from './data/cardSets/actions';
import { fetchCardSets } from './data/cardSets/operations';
import RoomDraft from './components/RoomDraft/RoomDraft';
import ContactUs from './components/ContactUs/ContactUs';
import CustomSetBuilder from './components/CustomSetBuilder/CustomSetBuilder';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

export let ip = ""

export function setIP(newIP: string){
  ip = newIP
}

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
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if(!ipLoaded || cardSets.length === 0) {
    return <div></div>
  }
  return (
    <div>
      <ToastManager
        position="bottom-left"
        autoDelete={true}
        dismissTime={7000}
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
              <Route path="/contactus">
                <ContactUs />
              </Route>
              <Route path={`/room/draft/:id`}>
                <RoomDraft />
              </Route>
              <Route path={`/room/:id`}>
                <RoomPage />
              </Route>
              <Route path="/CustomSetBuilder/:id">
                <CustomSetBuilder />
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

