import React from "react";
import GoogleLogin from "react-google-login";
import { login } from "./login";
import { useDispatch, useSelector } from "react-redux";
import { googleLogin } from "../store/auth/index";
///import "./googleLogin.css";
import { useHistory } from "react-router-dom";
export default (props) => {
  const dispatch = useDispatch();
  let history = useHistory();
  
  const responseGoogle = async (authResult) => {
    try {
      console.log(
        "🚀 ~ file: GoogleLogin.js ~ line 9 ~ responseGoogle ~ authResult",
        authResult
      );
      if (authResult["code"]) {
        const result = await dispatch(googleLogin(authResult["code"], history));
        console.log(result);
      } else {
        throw new Error(authResult);
      }
    } catch (e) {
      console.log(
        "🚀 ~ file: GoogleLogin.js ~ line 22 ~ responseGoogle ~ e",
        e
      );
      console.log(e);
    }
  };

  return (
    <div className="login-page" style={{textAlign:'center'}}>
      <GoogleLogin
        // use your client id here
        clientId={
          process.env.REACT_APP_GOOGLE_CLIENT_ID
        }
        className='googleButton'
        buttonText="Sign in with google"
        responseType="code"
        theme="dark"
       // className="google-btn"
        /**
         * To get access_token and refresh_token in server side,
         * the data for redirect_uri should be postmessage.
         * postmessage is magic value for redirect_uri to get credentials without actual redirect uri.
         */
        redirectUri="postmessage"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};
