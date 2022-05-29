import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { resetPasswordThunk } from "../../data/login/operations";
import "./ResetPassword.css"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

type UserSubmitForm = {
    email: string;
    password: string;
};

function ResetPasswordPage() {
    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .max(40, 'Password must not exceed 40 characters'),
    });

    const params: { newPasswordId: string } = useParams()
    const uuid = params.newPasswordId

    const dispatch = useDispatch()
    const history = useHistory()

    async function handleResetPassword() {
        const resetPasswordSuccess = await dispatch(resetPasswordThunk(getValues("password"), uuid)) as unknown as boolean
        if (resetPasswordSuccess) {
            history.push("/")
        }
    }

    function resetPassword() {
        handleResetPassword()
    }

    const {
        handleSubmit,
        register,
        getValues,
        formState: { errors }
    } = useForm<UserSubmitForm>({
        resolver: yupResolver(validationSchema)
    });

    return (
        <div className="register-form">
            <form className="maxWH" onSubmit={handleSubmit(resetPassword)}>
                <div className="BoosterPickerWrapper d-flex justify-content-center row h-100 px-2">
                    <div className="BoosterWindowedArea bd-highlight col-sm-3">
                        <div className="InfoBlurb">
                            Reset Password
                        </div>
                        <div className="form-group pb-2">
                        <label className="control-label col-6" htmlFor="setName">Password:</label>
                            <div className="col-12">          
                                <input
                                    type="password"
                                    className={`form-control dark-themed-textarea form-control ${errors.password ? 'is-invalid' : ''}` }
                                    placeholder="Password"
                                    {...register('password')}
                                />
                                <div className="invalid-feedback">{errors.password?.message}</div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center pt-2">
                            <button type="submit" className="LaunchButton w-100 btn-lg btn-primary">Reset Password</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>

    )
}

export default ResetPasswordPage;


