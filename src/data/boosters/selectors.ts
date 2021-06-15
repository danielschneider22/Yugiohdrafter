import { initState } from "../reducers";

export const getBoosters = (state: typeof initState) => state.boosters.byId;
export const getBoosterIds = (state: typeof initState) => state.boosters.allIds;