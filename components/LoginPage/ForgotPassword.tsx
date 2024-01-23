import { useDispatch } from "react-redux";
import { sendRecoveryEmailThunk } from "../../data/login/operations";
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from "./Login.module.css"

type UserSubmitForm = {
  email: string;
};

function ForgotPassword() {
  const dispatch = useDispatch()

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
  });

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors }
  } = useForm<UserSubmitForm>({
    resolver: yupResolver(validationSchema)
  });

  function resetPassword() {
    dispatch(sendRecoveryEmailThunk(getValues("email")))
  }

  return (
    <div className={styles["register-form"]}>
      <form className="maxWH" onSubmit={handleSubmit(resetPassword)}>
        <div className="BoosterPickerWrapper d-flex justify-content-center row h-100 px-2">
          <div className="BoosterWindowedArea bd-highlight col-sm-3">
            <div className="InfoBlurb">
                Password Recovery
            </div>
            <div className="col-12">          
                <input
                  type="email"
                  className={`form-control dark-themed-textarea form-control ${errors.email ? 'is-invalid' : ''}` }
                  placeholder="Email"
                  {...register('email')}
                />
                <div className="invalid-feedback">{errors.email?.message}</div>
            </div>
            <div className="d-flex justify-content-center pt-2">
              <button type="submit" className="LaunchButton w-100 btn-lg btn-primary">Send Password Recovery Email</button>
            </div>
          </div>
        </div>
      </form>
    </div>
    
  )
}

export default ForgotPassword;


