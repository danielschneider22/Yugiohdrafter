import { RootState } from "../../../models/RootState";

export const roomByIdSel = (state: RootState, id: string) => state.data.rooms.byId[id] || null