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
    if (result  && !result[1]) {
        dispatch(loginFetchSuccess(email))
        return Promise.resolve(true)
    } else {
        dispatch(loginFetchFail())
        Promise.resolve(false)
    }
}

async function loginOp(email: string, password: string): Promise<string> {
    const url = `${baseApiUrl}/users/login`
    const resp = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
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
    if (result && !result[1]) {
        dispatch(createAccountFetchSuccess(email))
        dispatch(addToast({ id: _.uniqueId("message-sent-"), type: "Success", description: "Account Created", title: "Success", backgroundColor: toastBGColorDict["Success"] }))
        return Promise.resolve(true)
    } else {
        dispatch(createAccountFetchFail())
        return Promise.resolve(false)
    }
}

async function createAccountOp(email: string, password: string): Promise<string> {
    const url = `${baseApiUrl}/users/createAccount`
    const resp = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
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
        headers: { 'Content-Type': 'application/json' },
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
    }
}

async function logoutOp(): Promise<string> {
    const url = `${baseApiUrl}/users/logout`
    const resp = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
    })
    if (resp.ok)
        return resp.text()
    else
        throw new Error((await resp.json()).error)
}

export const sendRecoveryEmailThunk = (email: string): ThunkAction<void, RootStateOrAny, unknown, Action<string>> => async (dispatch, getState) => {
    const result = await tryCatchPromise(dispatch, [email])<string>(sendRecoveryEmailOp)
    if (result[0] && result[0] === "Success") {
        dispatch(addToast({ id: _.uniqueId("message-sent-"), type: "Success", description: "A password reset email has been sent", title: "Success", backgroundColor: toastBGColorDict["Success"] }))
    }
}

async function sendRecoveryEmailOp(email: string): Promise<string> {
    const url = `${baseApiUrl}/users/sendRecoveryEmail/${email}`
    const resp = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
    })
    if (resp.ok)
        return resp.text()
    else
        throw new Error((await resp.json()).error)
}

export const resetPasswordThunk = (email: string, uuid: string): ThunkAction<void, RootStateOrAny, unknown, Action<string>> => async (dispatch, getState) => {
    const result = await tryCatchPromise(dispatch, [email, uuid])<string>(resetPasswordOp)
    if (result && result[0]) {
        dispatch(loginFetchSuccess(result[0]))
        dispatch(addToast({ id: _.uniqueId("message-sent-"), type: "Success", description: "Password Successfully Reset", title: "Success", backgroundColor: toastBGColorDict["Success"] }))
        return Promise.resolve(true)
    }
    return Promise.resolve(false)
}

async function resetPasswordOp(password: string, uuid: string): Promise<string> {
    const url = `${baseApiUrl}/users/resetPassword/`
    const resp = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({
            password,
            uuid
        })
    })
    if (resp.ok)
        return resp.text()
    else
        throw new Error("A password reset email could not be sent")
}