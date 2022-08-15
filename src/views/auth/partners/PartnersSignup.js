import React, { Component } from "react";
import { Field, Form } from "react-final-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../store/auth";
import nuleep from "../../../assets/landingPages/nuleepLogo.png";
import GoogleLogin from "../../../components/GoogleLogin";
import { useEffect } from "react";

class PartnersSignup extends Component {
  state={
    emailMessage:false
  }
  componentDidMount() {
    this.props.clearErrors();
  }
  // handleFormSubmit({ email, password, name }) {
  //   // Call action creator to sign up user

  //   // Force email to be lowercase
  //   console.log("fdsfds", this.props.history);
  //   const history = this.props.history;
  //   console.log(history);
  //   this.props.signupUser({
  //     email,
  //     password,
  //     name,
  //     history,

  //   });
  // }

  renderAlert = () => {
    if (this.props.errorMessage) {
      return (
        <p className="mt-4 font-bold tracking-wide text-red-400">
          {this.props.errorMessage}
        </p>
      );
    }
  };

  render() {
    return (
      <div className="flex min-h-screen bg-white">
        <div className="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="w-full max-w-sm mx-auto lg:w-96">
            <div>
              <Link to="/partners">
                <img className="w-auto h-12" src={nuleep} alt="Nuleep Logo" />
              </Link>
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Sign up for Nuleep
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Or{" "}
                <Link
                  to="/partnersSignin"
                  className="font-medium text-teal-600 hover:text-teal-500"
                >
                  Already have an account? Login
                </Link>
              </p>
            </div>

            <div className="mt-8">
              <div className="mt-6">
                <GoogleLogin />
                <Form
                  onSubmit={({
                    email,
                    password,
                    name,
                    lastName,
                    firstName,
                  }) => {
                    const history = this.props.history;
                    email = email.toLowerCase();
                    localStorage.setItem("email", email);
                    this.props.signupUser({
                      email,
                      password,
                      name,
                      history,
                      userType: "recruiter",
                    });
                    this.setState({emailMessage:true})
                  }}
                  validate={(values) => {
                    const errors = {};

                    if (!values.email) {
                      errors.email = "Required";
                    } else if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                        values.email
                      )
                    ) {
                      errors.email = "Invalid email address";
                    }

                    if (!values.password) {
                      errors.password = "Required";
                    }
                    // if (!values.lastName) {
                    //   errors.lastName = "Required";
                    // }
                    // if (!values.firstName) {
                    //   errors.firstName = "Required";
                    // }

                    if (!values.passwordConfirm) {
                      errors.passwordConfirm = "Required";
                    }

                    if (values.password !== values.passwordConfirm) {
                      errors.password = "Passwords must match";
                    }
                    return errors;
                  }}
                >
                  {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                      {/* <label
                        htmlFor="email"
                        className="block mt-6 text-sm font-medium text-gray-700"
                      >
                        First Name
                      </label>
                      <Field name="firstName">
                        {(props) => (
                          <div>
                            <input
                              id="email"
                              type="text"
                              className="w-full p-2 border border-gray-300 rounded-lg"
                              name={props.input.firstName}
                              value={props.input.value}
                              onChange={props.input.onChange}
                            />
                            {props.meta.touched && props.meta.error && (
                              <span className="block mt-2 text-red-500">
                                {props.meta.error}
                              </span>
                            )}
                          </div>
                        )}
                      </Field>
                      <label
                        htmlFor="lastName"
                        className="block mt-6 text-sm font-medium text-gray-700"
                      >
                        last Name
                      </label>
                      <Field name="lastName">
                        {(props) => (
                          <div>
                            <input
                              id="email"
                              type="text"
                              className="w-full p-2 border border-gray-300 rounded-lg"
                              name={props.input.lastName}
                              value={props.input.value}
                              onChange={props.input.onChange}
                            />
                            {props.meta.touched && props.meta.error && (
                              <span className="block mt-2 text-red-500">
                                {props.meta.error}
                              </span>
                            )}
                          </div>
                        )}
                      </Field> */}
                      <label
                        htmlFor="email"
                        className="block mt-6 text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <Field name="email">
                        {(props) => (
                          <div>
                            <input
                              id="email"
                              autocomplete="off"
                              placeholder='name@work-email.com'
                              type="text"
                              className="w-full p-2 border border-gray-300 rounded-lg"
                              name={props.input.email}
                              value={props.input.value}
                              onChange={props.input.onChange}
                            />
                            {props.meta.touched && props.meta.error && (
                              <span className="block mt-2 text-red-500">
                                {props.meta.error}
                              </span>
                            )}
                          </div>
                        )}
                      </Field>
                      <label
                        htmlFor="password"
                        className="block mt-6 text-sm font-medium text-gray-70"
                      >
                        Password
                      </label>
                      <Field name="password">
                        {(props) => (
                          <div>
                            <input
                              id="password"
                              type="password"
                              
                              className="block w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                              name={props.input.password}
                              value={props.input.value}
                              onChange={props.input.onChange}
                            />
                            {props.meta.touched && props.meta.error && (
                              <span className="block mt-2 text-red-500">
                                {props.meta.error}
                              </span>
                            )}
                          </div>
                        )}
                      </Field>
                      <label className="block mt-6 text-sm font-medium text-gray-700">
                        Confirm Password
                      </label>
                      <Field htmlFor="passwordConfirm" name="passwordConfirm">
                        {(props) => (
                          <div>
                            <input
                              id="passwordConfirm"
                              type="password"
                              className="block w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                              name={props.input.passwordConfirm}
                              value={props.input.value}
                              onChange={props.input.onChange}
                            />
                            {props.meta.touched && props.meta.error && (
                              <span className="block mt-2 text-red-500">
                                {props.meta.error}
                              </span>
                            )}
                          </div>
                        )}
                      </Field>
                      {this.renderAlert()}

                      <button
                        className="flex justify-center w-full px-4 py-2 mt-8 text-sm font-medium text-white bg-teal-600 border border-transparent rounded-3xl shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                        type="submit"
                      >
                        Sign up
                      </button><br/>
                         {this.props.auth? <div style={{color:'red'}}>Check your email and verify account</div>:''}
                      {/* <Link
                        to={"/partners"}
                        className="block font-bold mt-4 no-underline pb-2 text-center text-teal-600 tracking-wide"
                      >
                        Go back
                      </Link> */}
                    </form>
                  )}
                </Form>
                <div className="text-base text-center	" >
                  <span>
                    {" "}
                    By continuing, you’re agreeing to our <br />
                  </span>
                  <a href="/termsofuse" className="font-bold text-teal-600">
                    Terms of Use and
                  </a>,{" "}
                  <a href="/privacypolicy" className="font-bold text-teal-600">
                    Privacy Policy
                  </a>
                 .
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative flex-1 hidden w-0 lg:block">
          <img
            className="absolute inset-0 object-cover w-full h-full"
            src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
            alt=""
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    auth: state.auth.authenticated
  };
}

export default connect(mapStateToProps, actions)(PartnersSignup);
