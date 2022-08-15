import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/auth';
import Navbar from '../../components/layouts/navbar';
import { withRouter,useHistory } from 'react-router-dom';

const ResetPasswordOrg = ({ match, resetPasswordOrg, history }) => {
    
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [linkExpired, setLinkExpired] = useState(false);
  
    const onSubmit =async () => {
        if (!password||!confirmPassword )
            setMessage(
                <p className="py-4 mt-4 text-center text-red-900 bg-red-100 rounded-lg">
                    Please enter a password or confirm Password

                </p> 
            );else{
        if(password == confirmPassword){
            setMessage('')
          const result= await resetPasswordOrg(password, match.params.resetID, history,match.params.orgId,match.params.data);
          if(result?.error){
            setLinkExpired(true)
            setMessage(
                <p className="py-4 mt-4 text-center text-red-900 bg-red-100 rounded-lg">
                   Your reset password link expired.
                </p>
            );
            setTimeout(()=>{
                setLinkExpired(false)
                
                history.push('/')
            },2000)
          }else{
              history.push("/dashboard");
          }
          
        }else{
            setMessage(
                <p className="py-4 mt-4 text-center text-red-900 bg-red-100 rounded-lg">
                    Passwords do not match
                </p>
            );
        }    

            }
       
        
    };

    return (
        <div>
            <Navbar />
            <div className="px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <header>
                    <div>
                        <h1 className="text-3xl font-bold leading-tight text-center text-gray-900">
                            Reset Password
                        </h1>
                    </div>
                </header>
               
                <main className="max-w-md mx-auto mt-4">
                   
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            New Password
                        </label>
                        <div className="mt-1">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                aria-describedby="new-password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Confirm Password
                        </label>
                        <div className="mt-1">
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                aria-describedby="confirm-password"
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                value={confirmPassword}
                            />
                        </div>
                    </div>
                    {message}
                    <button
                        onClick={() => onSubmit()}
                        className="flex justify-center w-full px-4 py-2 mt-4 mt-8 text-sm font-medium text-white bg-teal-600 border border-transparent rounded-md shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                        type="submit"
                    >
                        Confirm New Password
                    </button>
                </main>
                
            </div>
           
        </div>
    );
};

export default withRouter(connect(null, actions)(ResetPasswordOrg));
