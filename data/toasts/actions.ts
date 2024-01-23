import { Toast } from "../../constants/Toast"

export interface AddToast {
    type: 'toast/addToast',
    toast: Toast,
}

export function addToast(toast: Toast) {
    return {
        type: 'toast/addToast',
        toast
    }
}

interface RemoveToast {
    type: 'toast/removeToast',
    id: string,
}

export function removeToast(id: string) {
    return {
        type: 'toast/removeToast',
        id,
    }
}


export type ToastActions = AddToast | RemoveToast;