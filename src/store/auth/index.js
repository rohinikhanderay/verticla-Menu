import axios from 'axios'
import { API_URL, MailChimp_API_Key, MailChimp_API_URL } from '../API_URL'
import {
  AUTH_ERROR,
  AUTH_USER,
  UNAUTH_USER,
  CLEAR_ERROR,
  GOOGLE_AUTH_DATA_CLEAR,
  GOOGLE_AUTH_DATA,
  AUTH_ADMIN,
} from './types'
import { createProfile, sendVerifyEmail, viewProfile } from '../profile/index'

const result = require('dotenv').config()

export function adminLogin({ email, password, history }) {
  return function (dispatch) {
    // Submit email/password to the server
    axios
      .post(`${API_URL}/api/users/admin/signin`, { email, password })
      .then((response) => {
        // If request is good...
        // - Update state to indicate user is authenticated
        dispatch({ type: AUTH_ADMIN })
        // - Save the JWT
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('userRole', response.data.user.role)
        // - redirect to /dashboard
        history.push({
          pathname: '/admin/organization',
          state: { login: true },
        })
        // history.push("/dashboard");
      })
      .catch((error) => {
        // If request is bad...
        // - Show an error to the user
        dispatch(authError(error?.response?.data?.data))
      })
  }
}

export function signinUser({ email, password, history }) {
  return function (dispatch) {
    // Submit email/password to the server
    axios
      .post(`${API_URL}/api/users/signin`, { email, password })
      .then((response) => {
        // If request is good...
        // - Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER })
        // - Save the JWT
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('exptTime', response.data.expTime)

        localStorage.setItem('email', email)

        if (response.data.data.isProfile == true) {
          history.push('/dashboard')
        }
      })
      .catch((error) => {
        // If request is bad...
        // - Show an error to the user
        dispatch(authError(error?.response?.data?.data))
      })
  }
}

export function reqSigninUser({ email, password, history }) {
  return function (dispatch) {
    // Submit email/password to the server
    axios
      .post(`${API_URL}/api/users/reqSignin`, { email, password })
      .then((response) => {
        // If request is good...
        // - Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER })
        // - Save the JWT
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('exptTime', response.data.expTime)

        localStorage.setItem('email', email)

        if (response.data.data.isProfile == true) {
          history.push('/dashboard')
        } else {
          history.push({
            pathname: '/onboarding',
            state: { type: 'recruiter', status: true },
          })
        }

        // });

        // history.push("/dashboard");
      })
      .catch((error) => {
        // If request is bad...
        // - Show an error to the user

        dispatch(authError(error?.response?.data?.data))
      })
  }
}

export function googleLogin(code, history) {
  return function (dispatch) {
    // Submit email/password to the server
    axios(`${API_URL}/api/users/google`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({ code }),
    })
      .then((response) => {
        dispatch({ type: GOOGLE_AUTH_DATA })
        // // - Save the JWT
        // localStorage.setItem("token", response.data.token);
        // // - redirect to /dashboard
        // history.push({
        //   pathname: "/dashboard",
        //   state: { login: true },
        // });
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('email', response.data.email)
        if (response.data.hasProfile) {
          history.push({
            pathname: '/dashboard',
          })
        } else {
          history.push({
            pathname: '/onboarding',
            state: { type: 'recruiter', status: true },
          })
        }
      })
      .catch((error) => {
        dispatch(authError(error?.response?.data?.data))
      })
  }
}

export function signupUser({
  email,
  password,
  name,
  lastName,
  firstName,
  history,
  userType,
}) {
  return function (dispatch) {
    axios
      .post(`${API_URL}/api/users/signup`, {
        email,
        password,
        name,
        lastName,
        firstName,
        userType,
      })
      .then((response) => {
        dispatch({ type: AUTH_USER })
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('exptTime', response.data.expTime)
        dispatch(sendVerifyEmail({ pId: response.data.data._id, email: email }))
        if (userType == 'jobSeeker') {
          dispatch(
            createProfile(
              {
                role: userType,
                name: name,
                lastName: lastName,
                firstName: firstName,
              },
              history,
              '',
              '',
              '',
              '',
            ),
          )
        } else {
          localStorage.clear();
          if (userType == 'recruiter') {
            setTimeout(() => {
              history.push('/partnersSignin')
              dispatch({ type: UNAUTH_USER })
            }, 3000)
          }
        }
      })
      .catch((error) => {
        dispatch(authError(error?.response?.data?.data))
      })
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error,
  }
}

export function signoutUser() {
  localStorage.clear()

  return { type: UNAUTH_USER }
}

export function mailChimpApi(data) {
  return function (dispatch) {
    try {
      const response = axios.post(`${API_URL}/api/users/mailchimp/addmember`,data)
      return response;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}

export function forgotPassword(email) {
  return function (dispatch) {
    axios
      .post(`${API_URL}/api/users/forgotpassword`, { email })
      .then((response) => {})
      .catch((error) => {})
  }
}
export function profileStatus(data) {
  return function (dispatch) {
    axios
      .post(`${API_URL}/api/users/profileStatus`, data)
      .then((response) => {})
      .catch((error) => {})
  }
}

// export async function resetPasswordOrg(password, token, history,orgid) {
//   return await function (dispatch) {
//     axios
//       .post(`${API_URL}/api/users/resetpasswordOrg/${token}`, { password,orgid })
//       .then((response) => {
//         localStorage.setItem("token", response.data.token);
//            dispatch({ type: AUTH_USER });
//         history.push("/dashboard");
//       })
//       .catch((error) => {
//       return error
//       });
//   };
// }
export const resetPasswordOrg = (
  password,
  token,
  history,
  orgid,
  data,
) => async (dispatch) => {
  try {
    return axios
      .post(`${API_URL}/api/users/resetpasswordOrg/${token}`, {
        password,
        orgid,
        data,
      })
      .then((res) => {
        localStorage.setItem('token', res.data.token)
        dispatch({ type: AUTH_USER })
        return res.data
      })
      .catch((er) => {
        return er.response.data
      })
  } catch (err) {
    // dispatch({
    //   type: PROFILE_ERROR,
    //   payload: err.response.data.error,
    // });
  }
}
export function resetPassword(password, token, history, orgid) {
  return function (dispatch) {
    axios
      .post(`${API_URL}/api/users/resetpassword/${token}`, { password, orgid })
      .then((response) => {
        localStorage.setItem('token', response.data.token)
        dispatch({ type: AUTH_USER })
        history.push('/dashboard')
      })
      .catch((error) => {
        // console.log(error);
      })
  }
}

export const claimCompRquest = (data) => async (dispatch) => {
  // console.log(data)
  // return function (dispatch) {
  //   axios
  //     .post(`${API_URL}/api/users/claimRequestEmail`, data)
  //     .then((response) => {
  //       // localStorage.setItem('token', response.data.token)
  //       return response.data
  //       //dispatch({ type: AUTH_USER })
  //       // history.push('/dashboard')
  //     })
  //     .catch((error) => {
  //       // console.log(error);
  //     })
  // }
  try {
    return await axios
      .post(`${API_URL}/api/users/claimRequestEmail`, data)
      .then((res) => {
        return res.data
      })
  } catch (err) {
    console.log(err)
  }
}

export function clearErrors() {
  return function (dispatch) {
    dispatch({ type: CLEAR_ERROR })
  }
}
