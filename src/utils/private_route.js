import React from "react";
import { Route, Redirect } from "react-router-dom";

// receives component and any other props represented by ...rest
export default function PrivateRoute({ component: Component, ...rest}) {
  return (

    // this route takes other route assigned to it from the App.js and return the same route if condition is met
    <Route
      {...rest}
      render={(props) => {
        // get cookie from browser if logged in
        const userRole = localStorage.getItem('userRole') || '';
        // return route if user is not admin
        if (userRole && rest.allowedRoles.includes(userRole)) {
          return <Component {...props} />;
        } else {
        return (
        <Redirect
             to={{
                pathname: "/",
              }}
           />
         );
        }
      }}
    />
  );
}