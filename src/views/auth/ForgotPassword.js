import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/auth';
import nuleep from '../../assets/landingPages/nuleepLogo.png';

const ForgotPassword = ({ forgotPassword }) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        if (!email) {
            return setMessage(
                <p className="mt-2 text-center text-red-600">
                    Please Enter a email
                </p>
            );
        }
        forgotPassword(email);
        setMessage(
            <p className="mt-2 text-center text-green-600">
                Check your email for a password reset link
            </p>
        );
    };

    return (
        <div className="flex min-h-screen bg-white">
            <div className="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                <div className="w-full max-w-sm mx-auto lg:w-96">
                    <div>
                        <Link to="/">
                            <img
                                className="w-auto h-12"
                                src={nuleep}
                                alt="Nuleep Logo"
                            />
                        </Link>
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                            Forgot your password?
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Enter in your email and we'll send you a password
                            reset link!
                        </p>
                    </div>

                    <form
                        onSubmit={(e) => {
                            onSubmit(e);
                        }}
                        className="mt-4"
                    >
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <div className="mt-1">
                            <input
                                type="text"
                                name="email"
                                id="email"
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                placeholder="you@example.com"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </div>
                        {message}
                        <button
                            className="flex justify-center w-full px-4 py-2 mt-4 mt-8 text-sm font-medium text-white bg-teal-600 border border-transparent rounded-md shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                            type="submit"
                        >
                            Reset my password
                        </button>
                    </form>
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
};

export default connect(null, actions)(ForgotPassword);
