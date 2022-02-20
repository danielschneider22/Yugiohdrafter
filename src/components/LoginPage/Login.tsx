import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createAccountThunk, loginThunk } from "../../data/login/operations";
import "./Login.css"

function LoginPage() {
  const dispatch = useDispatch()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const history = useHistory()

  async function login(ev?: React.FormEvent) {
    ev?.preventDefault()
    const loggedIn = await dispatch(loginThunk(email, password)) as unknown as boolean
    if(loggedIn)
      history.push("/")
  }

  async function createAccount() {
    const createdAccount = await dispatch(createAccountThunk(email, password)) as unknown as boolean
    if(createdAccount)
      history.push("/")
  }

  function resetPassword() {
    history.push("/forgotPassword")
  }

  return (
    <form className="maxWH" onSubmit={login}>
      <div className="BoosterPickerWrapper d-flex justify-content-center row h-100 px-2">
        <div className="BoosterWindowedArea bd-highlight col-sm-3">
          <div className="InfoBlurb">
              Login
          </div>
          <label className="control-label col-6" htmlFor="setName">Email Address:</label>
          <div className="col-12">          
              <input type="email" value={email} onChange={(val) => setEmail(val.currentTarget.value)} className="form-control dark-themed-textarea" placeholder="Email" required/>
          </div>
          <label className="control-label col-6" htmlFor="setName">Password:</label>
          <div className="col-12">          
              <input type="password" value={password} onChange={(val) => setPassword(val.currentTarget.value)} className="form-control dark-themed-textarea" placeholder="Password" required/>
          </div>
          <div className="d-flex justify-content-center pt-2">
            <button onClick={login} className="LaunchButton w-100 btn-lg btn-primary">Login with Email</button>
          </div>
          <div className="d-flex justify-content-center pt-2">
            <button onClick={createAccount} className="LaunchButton w-100 btn-lg btn-secondary">Create Account</button>
          </div>
          <div className="d-flex justify-content-center pt-2">
            <div className="forgotPassword" onClick={() => resetPassword()}>Forgot Password?</div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default LoginPage;


