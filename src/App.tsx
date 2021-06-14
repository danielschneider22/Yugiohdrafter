import { useEffect, useState } from 'react';
import './App.css';
import { CardSet, getCardSets } from './data/cardSets/operations';

function App() {

  const [cardSets, setCardSets] = useState([] as CardSet[])

  useEffect(() => {
    const myCardSets = localStorage.getItem("cardSets");
    if(myCardSets) {
      console.log("hello");
    } else {
      getCardSets();
    }
    
  }, []);

  console.log(cardSets);

  return (
    <div className="App">
      <input></input>
    </div>
  );
}

export default App;
