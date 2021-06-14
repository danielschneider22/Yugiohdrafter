import { initState } from "../../App";

export const getCardSets = (state: typeof initState) => Object.values(state.cardSets.byId);