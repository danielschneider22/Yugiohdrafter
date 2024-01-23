import { LoginTypes } from "./types";


interface LoginFetch {
    type: 'login/loginFetch',
}

export function loginFetch() {
    return {
        type: LoginTypes.LoginFetch,
    }
}

interface LoginFetchSuccess {
    type: 'login/loginFetchSuccess',
    email: string
}

export function loginFetchSuccess(email: string) {
    return {
        type: LoginTypes.LoginFetchSuccess,
        email
    }
}

interface LoginFetchFail {
    type: 'login/loginFetchFail',
}

export function loginFetchFail() {
    return {
        type: LoginTypes.LoginFetchFail,
    }
}
interface CreateAccountFetch {
    type: 'login/createAccountFetch',
}

export function createAccountFetch() {
    return {
        type: LoginTypes.CreateAccountFetch,
    }
}

interface CreateAccountFetchSuccess {
    type: 'login/createAccountFetchSuccess',
    email: string
}

export function createAccountFetchSuccess(email: string) {
    return {
        type: LoginTypes.CreateAccountFetchSuccess,
        email
    }
}

interface CreateAccountFetchFail {
    type: 'login/createAccountFetchFail',
}


export function createAccountFetchFail() {
    return {
        type: LoginTypes.CreateAccountFetchFail,
    }
}

interface ActiveSessionFetchSuccess {
    type: 'login/activeSessionFetchSuccess',
    email: string
}


export function activeSessionFetchSuccess(email: string) {
    return {
        type: LoginTypes.ActiveSessionFetchSuccess,
        email
    }
}

interface LogoutFetchSuccess {
    type: 'login/logoutFetchSuccess'
}


export function logoutFetchSuccess() {
    return {
        type: LoginTypes.LogoutFetchSuccess,
    }
}


export type LoginActions = LoginFetch | 
LoginFetchSuccess | 
LoginFetchFail | 
CreateAccountFetch | 
CreateAccountFetchSuccess | 
CreateAccountFetchFail |
ActiveSessionFetchSuccess |
LogoutFetchSuccess;