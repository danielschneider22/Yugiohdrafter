import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sendRecoveryEmailThunk } from "../../data/login/operations";
import "./Login.css"

function ForgotPassword() {
  const dispatch = useDispatch()
  const [email, setEmail] = useState("")

  function resetPassword(ev?: React.FormEvent) {
    ev?.preventDefault()
    dispatch(sendRecoveryEmailThunk(email))
  }

  return (
    <form className="maxWH" onClick={resetPassword}>
      <div className="BoosterPickerWrapper d-flex justify-content-center row h-100 px-2">
        <div className="BoosterWindowedArea bd-highlight col-sm-3">
          <div className="InfoBlurb">
              Password Recovery
          </div>
          <label className="control-label col-6" htmlFor="setName">Email Address:</label>
          <div className="col-12">          
              <input type="email" value={email} onChange={(val) => setEmail(val.currentTarget.value)} className="form-control dark-themed-textarea" placeholder="Email" required/>
          </div>
          <div className="d-flex justify-content-center pt-2">
            <button onClick={resetPassword} className="LaunchButton w-100 btn-lg btn-primary">Send Password Recovery Email</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default ForgotPassword;


