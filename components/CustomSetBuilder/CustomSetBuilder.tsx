import styles from "./CustomSetBuilder.module.css";

import { useDispatch, useSelector } from "react-redux";

import { getCardSetsById, getInitFetchComplete } from "../../data/cardSets/selectors";
import NavItem from "../NavItem/NavItem";
import { useEffect, useState } from "react";
import BulkAddForm from "./BulkAdd/BulkAddForm";
import { fetchCardsById } from "../../data/cards/operations";
import { getSetCards } from "../../data/cards/utils";
import AddFromSets from "./AddFromSets/AddFromSets";
import ViewEditList from "./ViewEditList/ViewEditList";
import { deleteCardSetsFetchThunk, publishCardSetFetchThunk } from "../../data/cardSets/operations";
import { getCardsById } from "../../data/cards/selectors";
import withScroll from "../withScroll/withScroll";
import { useRouter } from 'next/router';

type ParentProps = {
  scrollCardsRef: React.MutableRefObject<HTMLDivElement>
}

function CustomSetBuilder(props: ParentProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const initFetchSetComplete = useSelector(getInitFetchComplete)
  const cardSetsById = useSelector(getCardSetsById);
  const { id } = router.query
  const currSet = Object.values(cardSetsById).find(
    (set) => set.set_name === id
  );
  const cards = useSelector(getCardsById)
  const cardsSet = currSet && currSet.card_ids ? currSet.card_ids.map((id) => cards[id]) : []

  const [fetchedCards, setFetchedCards] = useState(false)

  useEffect(() => {
    if (initFetchSetComplete && currSet && !currSet!.card_ids) {
      getSetCards(currSet, dispatch);
    }
  }, [initFetchSetComplete, currSet]); // eslint-disable-line react-hooks/exhaustive-deps

  async function fetchCustomSetCards() {
    await fetchCardsById(dispatch, currSet!.card_ids || [], currSet!.id);
    setFetchedCards(true)
  }

  useEffect(() => {
    if (currSet?.card_ids) {
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
    <div className={styles["overflowSetBuilderWrapper"]} ref={props.scrollCardsRef}>
      <div className={styles["setBuilderWrapper"]}>
        <div className="BoosterPickerWrapper d-flex justify-content-center row h-100">
          <div className="BoosterWindowedArea bd-highlight col-sm-12">
            <ul className="nav nav-tabs justify-content-around">
              <li className="">
                <div className={styles["SetBuilderTitle"]}>{id}</div>
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
                  className={`input-group-text btn btn-primary ${styles["add-card-button"]}`}
                  id="inputGroup-sizing-sm"
                  onClick={() => { dispatch(publishCardSetFetchThunk(currSet!)) }}
                >
                  Publish Set
                </span>
                <span
                  className={`input-group-text btn btn-secondary ${styles["add-card-button"]}`}
                  id="inputGroup-sizing-sm"
                  onClick={ exportSet }
                >
                  Export Set
                </span>
                <span
                    className={`input-group-text btn btn-danger ${styles["add-card-button"]}`}
                    id="inputGroup-sizing-sm"
                    onClick={() => {dispatch(deleteCardSetsFetchThunk([currSet!.id]))}}
                  >
                    Delete Set
                </span>
              </li>
            </ul>
            {!fetchedCards && <div className={`${styles.ScrollCards} ${styles.CardDisplayAreaTitle}`}>Fetching Custom Set Cards...</div>}
            {fetchedCards && tabContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withScroll(CustomSetBuilder);

