import { createSelector } from "reselect";
import { initState } from "../reducers";

export const getToastsById = (state: typeof initState) => state.toasts.byId;
export const getToastsAllIds = (state: typeof initState) => state.toasts.allIds;

export const getSortedToasts = createSelector([getToastsById, getToastsAllIds], (toasts, toastsAllIds) => {
    return toastsAllIds.map((id) => toasts[id])
})
