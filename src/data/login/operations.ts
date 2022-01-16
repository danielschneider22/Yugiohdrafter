import _ from "lodash"
import { RootStateOrAny } from "react-redux"
import { Action } from "redux"
import { ThunkAction } from "redux-thunk"
import { baseApiUrl } from "../../constants/baseApiUrl"
import { toastBGColorDict } from "../../constants/Toast"
import { addToast } from "../toasts/actions"
import { tryCatchPromise } from "../utils"
import { activeSessionFetchSuccess, createAccountFetch, createAccountFetchFail, createAccountFetchSuccess, loginFetch, loginFetchFail, loginFetchSuccess, logoutFetchSuccess } from "./actions"

export const loginThunk = (email: string, password: string): ThunkAction<void, RootStateOrAny, unknown, Action<string>> => async (dispatch, getState) => {
    dispatch(loginFetch())
    const result = await tryCatchPromise(dispatch, [email, password])<string>(loginOp)
    if (result) {
      dispatch(loginFetchSuccess(email))
      dispatch(addToast({id: _.uniqueId("message-sent-"), type: "Success", description: "Logged in", title: "Success", backgroundColor: toastBGColorDict["Success"]}))
    } else {
      dispatch(loginFetchFail())
    }
}

async function loginOp(email: string, password: string): Promise<string> {
    const url = `${baseApiUrl}/users/login`
    const resp = await fetch(url, {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({
        email,
        password,
        })
    })
    if (resp.ok) 
        return resp.text()
    else
        throw new Error((await resp.json()).error)
}
  
export const createAccountThunk = (email: string, password: string): ThunkAction<void, RootStateOrAny, unknown, Action<string>> => async (dispatch, getState) => {
    dispatch(createAccountFetch())
    const result = await tryCatchPromise(dispatch, [email, password])<string>(createAccountOp)
    if (result) {
        dispatch(createAccountFetchSuccess(email))
        dispatch(addToast({id: _.uniqueId("message-sent-"), type: "Success", description: "Account Created", title: "Success", backgroundColor: toastBGColorDict["Success"]}))

    } else {
        dispatch(createAccountFetchFail())
    }
}

async function createAccountOp(email: string, password: string): Promise<string> {
    const url = `${baseApiUrl}/users/createAccount`
    const resp = await fetch(url, {
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
            }),
    })
    if (resp.ok) 
        return resp.text()
    else
        throw new Error((await resp.json()).error)
}

export const getUserIfActiveSessionThunk = (): ThunkAction<void, RootStateOrAny, unknown, Action<string>> => async (dispatch, getState) => {
    const result = await tryCatchPromise(dispatch, [])<string>(getUserIfActiveSessionOp)
    if (result[0] && result[0] !== "No active session") {
      dispatch(activeSessionFetchSuccess(result[0]))
      return true
    }
    return false
}

async function getUserIfActiveSessionOp(): Promise<string> {
    const url = `${baseApiUrl}/users/`
    const resp = await fetch(url, {
            headers: {'Content-Type': 'application/json'},
            method: 'GET',
    })
    if (resp.ok) 
        return resp.text()
    else
        throw new Error((await resp.json()).error)
}

export const logoutThunk = (): ThunkAction<void, RootStateOrAny, unknown, Action<string>> => async (dispatch, getState) => {
    const result = await tryCatchPromise(dispatch, [])<string>(logoutOp)
    if (result[0] && result[0] === "Success") {
      dispatch(logoutFetchSuccess())
      dispatch(addToast({id: _.uniqueId("message-sent-"), type: "Success", description: "Logged Out", title: "Success", backgroundColor: toastBGColorDict["Success"]}))
    }
}

async function logoutOp(): Promise<string> {
    const url = `${baseApiUrl}/users/logout`
    const resp = await fetch(url, {
            headers: {'Content-Type': 'application/json'},
            method: 'GET',
    })
    if (resp.ok) 
        return resp.text()
    else
        throw new Error((await resp.json()).error)
}