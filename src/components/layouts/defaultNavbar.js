/* This example requires Tailwind CSS v2.0+ */
import React from "react";
// import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Disclosure } from "@headlessui/react";
// import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import nuleepLogo from "../../assets/landingPages/nuleepLogo.png";

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }

class Navbar extends React.Component {
  renderLinks = () => {
    if (this.props.authenticated) {
      return (
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <Link
            to="/signout"
            className="inline-flex items-center hidden px-1 pt-1 font-medium text-gray-500 border-b-2 border-transparent md:block text-md"
          >
            Signout
          </Link>
        </div>
      );
    } else {
      return (
        <div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {this.props.history.location.pathname === "/partners" ? (
              <>
                {" "}
                <Link
                  to="/partnersSignin"
                  style={{ backgroundColor: "#16ACB2" }}
                  className={
                    "inline-flex items-center hidden inline-block px-8 py-2 ml-6 font-medium font-bold tracking-wider text-white border-b-2 border-transparent rounded-full md:block text-md"
                  }
                >
                  Login
                </Link>
                <a
                  style={{ backgroundColor: "#16ACB2", cursor: "pointer" }}
                  className="inline-flex items-center hidden inline-block px-8 py-2 ml-6 font-medium font-bold tracking-wider text-white border-b-2 border-transparent rounded-full md:block text-md"
                  onClick={() => {
                    this.props.history.push({
                      pathname: "/partnersSignup",
                      state: { type: "recruiter", status: true },
                    });
                  }}
                >
                  Start free trial
                </a>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  style={{ backgroundColor: "#16ACB2" }}
                  className={
                    "inline-flex items-center hidden inline-block px-8 py-2 ml-6 font-medium font-bold tracking-wider text-white border-b-2 border-transparent rounded-full md:block text-md"
                  }
                >
                  Login
                </Link>
                <a
                  style={{ backgroundColor: "#16ACB2", cursor: "pointer" }}
                  className="inline-flex items-center hidden inline-block px-8 py-2 ml-6 font-medium font-bold tracking-wider text-white border-b-2 border-transparent rounded-full md:block text-md"
                  onClick={() => {
                    this.props.history.push({
                      pathname: "/signup",
                      state: { type: "jobSeeker", status: true },
                    });
                  }}
                >
                  Register
                </a>
              </>
            )}
            {/* <Link
                            to="/signup"
                            style={{ backgroundColor: '#16ACB2' }}
                            className="inline-flex items-center hidden inline-block px-8 py-2 ml-6 font-medium font-bold tracking-wider text-white border-b-2 border-transparent rounded-full md:block text-md"
                        >
                            Register
                        </Link> */}
          </div>
        </div>
      );
    }
  };

  renderMobileLinks = () => {
    if (this.props.authenticated) {
      return (
        <Link
          to="/signout"
          className="block py-2 pl-3 pr-4 text-base font-medium text-gray-500 border-l-4 border-transparent hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
        >
          Signout
        </Link>
      );
    } else {
      return (
        <div>
          <Link
            to="/signin"
            className="block py-2 pl-3 pr-4 text-base font-medium text-gray-500 border-l-4 border-transparent hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="block py-2 pl-3 pr-4 text-base font-medium text-gray-500 border-l-4 border-transparent hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
          >
            Signup
          </Link>
        </div>
      );
    }
  };

  render() {
    return (
      <Disclosure as="nav" className="my-4 bg-transparent font-nunito">
        {({ open }) => (
          <>
            <div className="px-2 container m-auto">
              <div className="relative flex items-center justify-between h-16">
                <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block w-6 h-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block w-6 h-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex items-center justify-center flex-1 md:items-stretch md:justify-start">
                  <div className="flex items-center flex-shrink-0">
                    <Link to="/">
                      <img
                        className="block w-auto h-8 md:hidden"
                        src={nuleepLogo}
                        alt="Nuleep"
                      />
                    </Link>
                    <Link to="/">
                      <img
                        className="hidden w-auto h-8 md:block"
                        src={nuleepLogo}
                        alt="Nuleep"
                      />
                    </Link>
                  </div>
                  <div className="hidden ml-5 md:flex space-x-6">
                    {/* <Link
                                            to="/jobs"
                                            className={
                                                this.props.history.location
                                                    .pathname === '/jobs'
                                                    ? 'inline-flex items-center px-1 pt-1 font-medium text-white border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700 text-md'
                                                    : 'inline-flex items-center px-1 pt-1 font-medium text-gray-900 border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700 text-md'
                                            }
                                        >
                                            Find a Job
                                        </Link> */}
                    {/* <Link
                                            to="/"
                                            className="inline-flex items-center px-1 pt-1 font-medium text-gray-900 border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700 text-md"
                                        >
                                            Events
                                        </Link>
                                        <Link
                                            to="/"
                                            className="inline-flex items-center px-1 pt-1 font-medium text-gray-900 border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700 text-md"
                                        >
                                            Blog
                                        </Link> */}
                    <Link
                      to="/partners"
                      className={
                        this.props.history.location.pathname === "/jobs"
                          ? "inline-flex items-center px-1 pt-1 font-medium text-white border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700 text-md"
                          : "inline-flex items-center px-1 pt-1 font-medium text-gray-900 border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700 text-md"
                      }
                    >
                      Nuleep Partners
                    </Link>
                    <Link
                      to="/about"
                      className={
                        this.props.history.location.pathname === "/jobs"
                          ? "inline-flex items-center px-1 pt-1 font-medium text-white border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700 text-md"
                          : "inline-flex items-center px-1 pt-1 font-medium text-gray-900 border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700 text-md"
                      }
                    >
                      About Us
                    </Link>
                  </div>
                </div>
                {this.renderLinks()}
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="pt-2 pb-4 space-y-1">
                {/* <Link
                                    to="/jobs"
                                    className="block py-2 pl-3 pr-4 text-base font-medium text-teal-700 border-l-4 border-teal-500 bg-teal-50"
                                >
                                    Find a Job
                                </Link> */}
                {/* <Link
                                    to="/"
                                    className="block py-2 pl-3 pr-4 text-base font-medium text-gray-500 border-l-4 border-transparent hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                                >
                                    Events
                                </Link>
                                <Link
                                    to="/"
                                    className="block py-2 pl-3 pr-4 text-base font-medium text-gray-500 border-l-4 border-transparent hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                                >
                                    Blog
                                </Link> */}
                <Link
                  to="/partners"
                  className="block py-2 pl-3 pr-4 text-base font-medium text-gray-500 border-l-4 border-transparent hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                >
                  Nuleep Partners
                </Link>
                <Link
                  to="/about"
                  className="block py-2 pl-3 pr-4 text-base font-medium text-gray-500 border-l-4 border-transparent hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                >
                  About Us
                </Link>
                {this.renderMobileLinks()}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth.authenticated,
  };
}

export default withRouter(connect(mapStateToProps)(Navbar));
