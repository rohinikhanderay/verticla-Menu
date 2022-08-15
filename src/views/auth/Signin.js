import React from 'react'
import { Field, Form } from 'react-final-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../store/auth'
import nuleep from '../../assets/landingPages/nuleepLogo.png'
import { useEffect } from 'react'
import BetaSignage from '../../components/layouts/betaSignage'

class Signin extends React.Component {
  componentDidMount() {
    this.props.clearErrors()
  }

  renderAlert = () => {
    if (this.props.errorMessage) {
      return (
        <p className="mt-4 font-bold tracking-wide text-red-400">
          {this.props.errorMessage}
        </p>
      )
    }
  }
  render() {
    return (
      <>
        <BetaSignage />
        <div className="flex min-h-screen bg-white">
          <div className="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div className="w-full max-w-sm mx-auto lg:w-96">
              <div>
                <Link to="/">
                  <img className="w-auto h-12" src={nuleep} alt="Nuleep Logo" />
                </Link>
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                  Sign in to your account
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Or{' '}
                  <Link
                    to="/signup"
                    className="font-medium text-teal-600 hover:text-teal-500"
                  >
                    Signup for a new account
                  </Link>
                </p>
              </div>

              <div className="mt-8">
                <div className="mt-6">
                  <Form
                    onSubmit={({ email, password }) => {
                      const history = this.props.history
                      if (!email || !password) {
                        return null
                      }
                      email = email.toLowerCase()
                      this.props.signinUser({
                        email,
                        password,
                        history,
                      })
                    }}
                  >
                    {({ handleSubmit }) => (
                      <form onSubmit={handleSubmit}>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email address
                        </label>
                        <Field name="email">
                          {(props) => (
                            <div>
                              <input
                                id="email"
                                type="text"
                                className="block w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
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
                        <div className="mt-6">
                          <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Password
                          </label>
                        </div>

                        <Field name="password">
                          {(props) => (
                            <div>
                              <input
                                id="password"
                                type="password"
                                className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
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
                        {this.renderAlert()}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center">
                            <input
                              id="remember-me"
                              name="remember-me"
                              type="checkbox"
                              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                            />
                            <label
                              htmlFor="remember-me"
                              className="block ml-2 text-sm text-gray-900"
                            >
                              Remember me
                            </label>
                          </div>

                          <div className="text-sm">
                            <Link
                              to="/forgotpassword"
                              className="font-medium text-teal-600 hover:text-teal-500"
                            >
                              Forgot your password?
                            </Link>
                          </div>
                        </div>
                        <button
                          className="flex justify-center w-full px-4 py-2 mt-4 text-sm font-medium text-white bg-teal-600 border border-transparent rounded-md shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                          type="submit"
                        >
                          Log in
                        </button>
                        <Link
                          to={'/'}
                          className="inline-block pb-2 mt-4 tracking-wide text-center text-gray-400 underline"
                        >
                          Go back
                        </Link>
                      </form>
                    )}
                  </Form>
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
      </>
    )
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
  }
}

export default connect(mapStateToProps, actions)(Signin)
