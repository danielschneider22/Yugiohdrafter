import { LoginActions } from './actions';

type LoginState = {
    email?: string
}
export const loginInitState: LoginState = {
    email: undefined,
}

export default function loginReducer(state = loginInitState, action: LoginActions) {
    switch (action.type) {
      case 'login/activeSessionFetchSuccess': 
      case 'login/loginFetchSuccess': 
      case 'login/createAccountFetchSuccess': 
      {
        return {...state, email: action.email}
      }
      case 'login/logoutFetchSuccess':
        return {...state, email: undefined}
      default:
        return state
    }
}
