import "./CustomSetBuilder.css";

import { useDispatch, useSelector } from "react-redux";

import { getCardSetsById } from "../../data/cardSets/selectors";
import { useHistory, useParams } from "react-router-dom";
import NavItem from "../NavItem/NavItem";
import { useEffect, useRef, useState } from "react";
import AddRemoveCards from "./AddRemoveCards/AddRemoveCards";
import BulkAddForm from "./BulkAdd/BulkAddForm";
import { fetchCardsById } from "../../data/cards/operations";
import { getSetCards } from "../../data/cards/utils";
import { scrollToggleNavVisibility } from "../NavBar/ScrollBGColorChange";
import AddFromSets from "./AddFromSets/AddFromSets";
import CardAutocomplete, { AutocompleteOption } from "./AddRemoveCards/CardAutocomplete";
import { getCardsById } from "../../data/cards/selectors";
import { updateCardIds } from "../../data/cardSets/actions";

function CustomSetBuilder() {
  const dispatch = useDispatch();
  const history = useHistory();
  const cardSetsById = useSelector(getCardSetsById);
  const cards = useSelector(getCardsById);
  const params: { id: string } = useParams();
  const currSet = Object.values(cardSetsById).find(
    (set) => set.set_name === params.id
  );

  const scrollCardsRef = useRef(null as unknown as HTMLDivElement);

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

  useEffect(() => {
    if (currSet?.card_ids) {
      fetchCardsById(dispatch, currSet!.card_ids || [], currSet!.id);
    }
  }, [currSet?.card_ids]); // eslint-disable-line react-hooks/exhaustive-deps

  const [activeTab, setActiveTab] = useState("View/Edit List");
  const [removeActiveOption, setRemoveActiveOption] = useState<AutocompleteOption | null>(null);
  const [addActiveOption, setAddActiveOption] = useState<AutocompleteOption | null>(null);

  function tabContent() {
    switch (activeTab) {
      case "View/Edit List":
        const options = currSet!.card_ids
          ? currSet!.card_ids.map((id) => {
              return { id, label: cards[id].name };
            })
          : [];
          
        function addCardtoSet() {
          if(addActiveOption) {
            dispatch(updateCardIds([addActiveOption.id], currSet!.id, "add"));
          }
         
        }

        function removeCardFromSet() {
            if(removeActiveOption) {
                const newCards = currSet!.card_ids!.filter(
                    (id) => id !== removeActiveOption.id
                );
                dispatch(updateCardIds(newCards, currSet!.id, "overwrite"));
                setRemoveActiveOption(null)
            }
        }

        return (
          <>
            <CardAutocomplete
              id={"add-autocomplete"}
              label={"Card to Add"}
              options={[]}
              setActiveOption={() => {}}
              activeOption={addActiveOption}
            />
            <span
              className="input-group-text btn btn-success add-card-button"
              id="inputGroup-sizing-sm"
              onClick={addCardtoSet}
            >
              Add Card
            </span>
            <CardAutocomplete
              id={"remove-autocomplete"}
              label={"Card to Remove"}
              options={options}
              setActiveOption={setRemoveActiveOption}
              activeOption={removeActiveOption}
            />
            <span
              className="input-group-text btn btn-danger"
              id="inputGroup-sizing-sm"
              onClick={removeCardFromSet}
            >
              Remove Card
            </span>
            <AddRemoveCards setShown={currSet!} setEffected={currSet!} />
          </>
        );
      case "Add from Sets":
        return <AddFromSets setEffected={currSet!} />;
      case "Bulk Add":
        return (
          <BulkAddForm
            toggleCustomSetPopupVisiblity={() => null}
            isQuickCreate={true}
            set={currSet}
          />
        );
    }
  }

  return (
    <div className="overflowSetBuilderWrapper" ref={scrollCardsRef}>
      <div className="setBuilderWrapper">
        <div className="BoosterPickerWrapper d-flex justify-content-center row h-100">
          <div className="BoosterWindowedArea bd-highlight col-sm-12">
            <ul className="nav nav-tabs justify-content-center">
              <div className="d-flex flex-row flex-wrap justify-content-center">
                <li className="">
                  <div className="SetBuilderTitle">{params.id}</div>
                </li>
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
              </div>
            </ul>
            {tabContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomSetBuilder;

