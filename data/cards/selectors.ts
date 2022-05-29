import { initState } from "../reducers";

export const getCardsById = (state: typeof initState) => state.cards.byId;