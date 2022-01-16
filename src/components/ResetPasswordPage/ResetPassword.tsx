import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { resetPasswordThunk } from "../../data/login/operations";
import "./ResetPassword.css"

function ResetPasswordPage() {
    const params: { newPasswordId: string } = useParams()
    const uuid = params.newPasswordId

    const dispatch = useDispatch()
    const [password, setPassword] = useState("")
    const history = useHistory()

    async function resetPassword() {
        const resetPasswordSuccess = await dispatch(resetPasswordThunk(password, uuid)) as unknown as boolean
        if (resetPasswordSuccess) {
            history.push("/")
        }
    }

    return (
        <div className="maxWH">
            <div className="BoosterPickerWrapper d-flex justify-content-center row h-100 px-2">
                <div className="BoosterWindowedArea bd-highlight col-sm-3">
                    <div className="InfoBlurb">
                        Reset Password
                    </div>
                    <label className="control-label col-6" htmlFor="setName">New Password:</label>
                    <div className="col-12">
                        <input type="password" value={password} onChange={(val) => setPassword(val.currentTarget.value)} className="form-control dark-themed-textarea" placeholder="Password" required />
                    </div>
                    <div className="d-flex justify-content-center pt-2">
                        <button onClick={resetPassword} className="LaunchButton w-100 btn-lg btn-primary">Reset Password</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPasswordPage;


