import '../styles/boostrap.min.css';
import '../styles/bootstrapicons.css';
import '../styles/globals.css'
import '../styles/vendorStyles.css'

import type { AppProps } from 'next/app'
import { wrapper } from '../data/reducers';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addSets } from '../data/cardSets/actions';
import { getCardSetsFetchThunk } from '../data/cardSets/operations';
import { getCardSetsById } from '../data/cardSets/selectors';
import { getClientIp } from '../data/data/rooms/utils';
import { getUserIfActiveSessionThunk } from '../data/login/operations';
import { OnMount } from '../helpers/hooks';

export let ip = ""

export function setIP(newIP: string){
  ip = newIP
}

function MyApp({ Component, pageProps }: AppProps) {
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
  return <Component {...pageProps} />
}

export default wrapper.withRedux(MyApp);
