import { Toast } from "../../constants/Toast";
import { ToastActions } from "./actions";

export const toastsInitialState = {
    allIds: [] as string[],
    byId: {} as {[key: string]: Toast}
}

export default function toastReducer(state = toastsInitialState, action: ToastActions) {
    switch (action.type) {
      case 'toast/addToast': {
        const allIds = [...state.allIds, action.toast.id]
        const byId = {...state.byId, [action.toast.id]: action.toast}
        return {
            ...state,
            allIds,
            byId,
        }
      }
      case 'toast/removeToast': {
        const allIds = state.allIds.filter((id) => id !== action.id)
        const byId: {[key: string]: Toast} = {}
        Object.values(state.byId).forEach((toast) => {
          if(toast.id !== action.id) 
            byId[toast.id] = toast
        })
        return {
            ...state,
            allIds,
            byId,
        }
      }
      default:
        return state
  }
} 
