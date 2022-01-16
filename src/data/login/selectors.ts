import { initState } from "../reducers";

export const getUserEmail = (state: typeof initState) => state.login.email;