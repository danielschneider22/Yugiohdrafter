import { LoginTypes } from "./types";


interface LoginFetch {
    type: string,
}

export function loginFetch() {
    return {
        type: LoginTypes.LoginFetch,
    }
}

interface LoginFetchSuccess {
    type: string,
}

export function loginFetchSuccess() {
    return {
        type: LoginTypes.LoginFetchSuccess,
    }
}

interface LoginFetchFail {
    type: string,
}

export function loginFetchFail() {
    return {
        type: LoginTypes.LoginFetchFail,
    }
}
interface CreateAccountFetch {
    type: string,
}

export function createAccountFetch() {
    return {
        type: LoginTypes.CreateAccountFetch,
    }
}

interface CreateAccountFetchSuccess {
    type: string,
}

export function createAccountFetchSuccess() {
    return {
        type: LoginTypes.CreateAccountFetchSuccess,
    }
}

interface CreateAccountFetchFail {
    type: string,
}

export function createAccountFetchFail() {
    return {
        type: LoginTypes.CreateAccountFetchFail,
    }
}

export type LoginActions = LoginFetch | 
LoginFetchSuccess | 
LoginFetchFail | 
CreateAccountFetch | 
CreateAccountFetchSuccess | 
CreateAccountFetchFail;