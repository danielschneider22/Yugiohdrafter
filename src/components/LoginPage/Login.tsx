import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createAccountThunk, loginThunk } from "../../data/login/operations";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import "./Login.css"

import * as Yup from 'yup';

type UserSubmitForm = {
  email: string;
  password: string;
};

function LoginPage() {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
  });

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors }
  } = useForm<UserSubmitForm>({
    resolver: yupResolver(validationSchema)
  });

  const dispatch = useDispatch()
  const history = useHistory()

  async function attemptLogin() {
    const loggedIn = await dispatch(loginThunk(getValues("email"), getValues("password"))) as unknown as boolean
    if(loggedIn)
        history.push("/")
  }

  function login() {
    attemptLogin()
  }

  async function attemptCreateAccount() {
    if(!errors.email && !errors.password) {
      const createdAccount = await dispatch(createAccountThunk(getValues("email"), getValues("password"))) as unknown as boolean
      if(createdAccount)
        history.push("/")
    }
  }

  function createAccount() {
    attemptCreateAccount()
  }

  function resetPassword() {
    history.push("/forgotPassword")
  }

  return (
    <div className="register-form">
      <form className="maxWH" onSubmit={handleSubmit(login)}>
        <div className="BoosterPickerWrapper d-flex justify-content-center row h-100 px-2">
          <div className="BoosterWindowedArea bd-highlight col-sm-3">
            <div className="InfoBlurb">
                Login
            </div>
            <div className="form-group pb-2">
              <label className="control-label col-6" htmlFor="setName">Email Address:</label>
              <div className="col-12">          
                  <input
                    type="email"
                    className={`form-control dark-themed-textarea form-control ${errors.email ? 'is-invalid' : ''}` }
                    placeholder="Email"
                    {...register('email')}
                  />
                  <div className="invalid-feedback">{errors.email?.message}</div>
              </div>
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
              <button type="submit" className="LaunchButton w-100 btn-lg btn-primary">Login with Email</button>
            </div>
            <div className="d-flex justify-content-center pt-2">
              <button onClick={handleSubmit(createAccount)} className="LaunchButton w-100 btn-lg btn-secondary">Create Account</button>
            </div>
            <div className="d-flex justify-content-center pt-2">
              <div className="forgotPassword" onClick={() => resetPassword()}>Forgot Password?</div>
            </div>
          </div>
        </div>
      </form>
    </div>
    
  )
}

export default LoginPage;


