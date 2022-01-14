import { RootStateOrAny } from "react-redux"
import { Action } from "redux"
import { ThunkAction } from "redux-thunk"
import { baseApiUrl } from "../../constants/baseApiUrl"
import { tryCatchPromise } from "../utils"
import { createAccountFetch, createAccountFetchFail, createAccountFetchSuccess, loginFetch, loginFetchFail, loginFetchSuccess } from "./actions"

export const loginThunk = (email: string, password: string): ThunkAction<void, RootStateOrAny, unknown, Action<string>> => async (dispatch, getState) => {
    dispatch(loginFetch())
    const result = await tryCatchPromise(dispatch, [email, password])<string>(loginOp)
    if (result) {
      console.log(result)
      dispatch(loginFetchSuccess())
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
        password
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
        console.log(result)
        dispatch(createAccountFetchSuccess())
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
        password
        })
    })
    if (resp.ok) 
        return resp.text()
    else
        throw new Error((await resp.json()).error)
}