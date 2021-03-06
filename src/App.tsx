import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import LandingPage from './components/BoosterPicker/LandingPage';
import Draft from './components/Draft/Draft';
import DraftComplete from './components/DraftComplete/DraftComplete';
import NavBar from './components/NavBar/NavBar';
import SealedBoosterOpener from './components/SealedBoosterOpener/SealedBoosterOpener';
import ToastManager from './components/ToastManager/ToastManager';
import { useState } from 'react';
import { getClientIp } from './data/data/rooms/utils';
import RoomPage from './components/RoomPage/RoomPage';
import { getCardSetsById } from './data/cardSets/selectors';
import { addSets } from './data/cardSets/actions';
import RoomDraft from './components/RoomDraft/RoomDraft';
import ContactUs from './components/ContactUs/ContactUs';
import CustomSetBuilder from './components/CustomSetBuilder/CustomSetBuilder';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import { getCardSetsFetchThunk } from './data/cardSets/operations';
import LoginPage from './components/LoginPage/Login';
import { getUserIfActiveSessionThunk } from './data/login/operations';
import ForgotPassword from './components/LoginPage/ForgotPassword';
import ResetPasswordPage from './components/ResetPasswordPage/ResetPassword';
import { OnMount } from './helpers/hooks';

export let ip = ""

export function setIP(newIP: string){
  ip = newIP
}

function App() {
  const [ipLoaded, setIpLoaded] = useState(false)
  const [fetchedActiveSession, setFetchedActiveSession] = useState(false)
  const cardSets = Object.values(useSelector(getCardSetsById))
  const dispatch = useDispatch();

  OnMount(() => {
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
    } 
    dispatch(getCardSetsFetchThunk())
    fetchActiveSession()

  })

  async function fetchActiveSession() {
    await dispatch(getUserIfActiveSessionThunk())
    setFetchedActiveSession(true)
  }

  if(!fetchedActiveSession || !ipLoaded || cardSets.length === 0) {
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
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/forgotPassword">
                <ForgotPassword />
              </Route>
              <Route path="/resetPassword/:newPasswordId">
                <ResetPasswordPage />
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

