import "./CustomSetBuilder.css";

import { useDispatch, useSelector } from "react-redux";

import { getCardSetsById } from "../../data/cardSets/selectors";
import { useHistory, useParams } from "react-router-dom";
import NavItem from "../NavItem/NavItem";
import { useEffect, useRef, useState } from "react";
import BulkAddForm from "./BulkAdd/BulkAddForm";
import { fetchCardsById } from "../../data/cards/operations";
import { getSetCards } from "../../data/cards/utils";
import { scrollToggleNavVisibility } from "../NavBar/ScrollBGColorChange";
import AddFromSets from "./AddFromSets/AddFromSets";
import ViewEditList from "./ViewEditList/ViewEditList";
import { deleteCardSetsFetchThunk, publishCardSetFetchThunk } from "../../data/cardSets/operations";
import { getCardsById } from "../../data/cards/selectors";

function CustomSetBuilder() {
  const dispatch = useDispatch();
  const history = useHistory();
  const cardSetsById = useSelector(getCardSetsById);
  const params: { id: string } = useParams();
  const currSet = Object.values(cardSetsById).find(
    (set) => set.set_name === params.id
  );
  const cards = useSelector(getCardsById)
  const cardsSet = currSet && currSet.card_ids ? currSet.card_ids.map((id) => cards[id]) : []

  const scrollCardsRef = useRef(null as unknown as HTMLDivElement);
  const [fetchedCustomSetCards, setFetchedCustomSetCards] = useState(false)

  useEffect(() => {
    if (scrollCardsRef) {
      scrollCardsRef.current.addEventListener(
        "scroll",
        scrollToggleNavVisibility as unknown as (
          this: HTMLDivElement,
          ev: Event
        ) => any
      );
    }
  }, [scrollCardsRef]);

  if (!currSet) {
    history.push("/");
  }

  useEffect(() => {
    if (currSet) {
      getSetCards(currSet, dispatch);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function fetchCustomSetCards() {
    await fetchCardsById(dispatch, currSet!.card_ids || [], currSet!.id);
    setFetchedCustomSetCards(true)
  }

  useEffect(() => {
    if (currSet?.card_ids && currSet?.card_ids.length > 0) {
      fetchCustomSetCards()
    }
  }, [currSet?.card_ids]); // eslint-disable-line react-hooks/exhaustive-deps

  const [activeTab, setActiveTab] = useState("View/Edit List");

  function tabContent() {
    switch (activeTab) {
      case "View/Edit List":
        return <ViewEditList currSet={currSet!} />
      case "Add from Sets":
        return <AddFromSets setEffected={currSet!} />;
      case "Bulk Add":
        return (
          <BulkAddForm
            toggleCustomSetPopupVisiblity={() => null}
            isQuickCreate={true}
            set={currSet}
            isDarkTheme={true}
          />
        );
    }
  }

  function exportSet() {
    const element = document.createElement("a");
    let exportString = ""
    cardsSet.forEach((card) => exportString = exportString + "\n" + card.name)
    const file = new Blob([exportString.substring(1)], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = currSet?.set_name + ".txt"
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  return (
    <div className="overflowSetBuilderWrapper" ref={scrollCardsRef}>
      <div className="setBuilderWrapper">
        <div className="BoosterPickerWrapper d-flex justify-content-center row h-100">
          <div className="BoosterWindowedArea bd-highlight col-sm-12">
            <ul className="nav nav-tabs justify-content-around">
              <li className="">
                <div className="SetBuilderTitle">{params.id}</div>
              </li>
              <li className="d-flex flex-row flex-wrap justify-content-center">
                <NavItem
                  text="View/Edit List"
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
                <NavItem
                  text="Add from Sets"
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
                <NavItem
                  text="Bulk Add"
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
              </li>
              <li>
                <span
                  className="input-group-text btn btn-primary add-card-button"
                  id="inputGroup-sizing-sm"
                  onClick={() => { dispatch(publishCardSetFetchThunk(currSet!)) }}
                >
                  Publish Set
                </span>
                <span
                  className="input-group-text btn btn-secondary add-card-button"
                  id="inputGroup-sizing-sm"
                  onClick={ exportSet }
                >
                  Export Set
                </span>
                <span
                    className="input-group-text btn btn-danger add-card-button"
                    id="inputGroup-sizing-sm"
                    onClick={() => {dispatch(deleteCardSetsFetchThunk([currSet!.id]))}}
                  >
                    Delete Set
                </span>
              </li>
            </ul>
            {!fetchedCustomSetCards && <div className={"ScrollCards CardDisplayAreaTitle"}>Fetching Custom Set Cards...</div>}
            {fetchedCustomSetCards && tabContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomSetBuilder;

